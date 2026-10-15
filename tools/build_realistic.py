import sys,json,cv2,numpy as np
from sklearn.cluster import KMeans
def build(src,pid,name,level,K,min_area,work=300,flat=1,seed=3,med=7,thin=3.0,dil=2,sig=1.2):
    img=cv2.imread(src);H,W=img.shape[:2];s=min(H,W)
    x0=(W-s)//2;img=img[(H-s)//2:(H-s)//2+s,x0:x0+s]
    img=cv2.resize(img,(work,work),interpolation=cv2.INTER_AREA)
    for _ in range(flat):
        img=cv2.bilateralFilter(img,9,40,7)
    img=cv2.pyrMeanShiftFiltering(img,6,14) if flat>1 else img
    lab=cv2.cvtColor(img,cv2.COLOR_BGR2LAB).astype(np.float32)
    # lab scaled to true Lab for distances
    labf=lab*np.array([100/255,1,1],np.float32)-np.array([0,128,128],np.float32)
    X=labf.reshape(-1,3);km=KMeans(K,n_init=4,random_state=seed).fit(X[::3])
    lbl=km.predict(X).reshape(work,work).astype(np.int32);cent=km.cluster_centers_
    lbl=cv2.medianBlur(lbl.astype(np.uint8),med).astype(np.int32)
    # merge small components into neighbour cluster with longest shared border
    kern=np.ones((3,3),np.uint8)
    for it in range(40):
        changed=False;new=lbl.copy()
        comps=[]
        for c in range(K):
            m=(lbl==c).astype(np.uint8)
            if not m.any():continue
            n,cc,st,_=cv2.connectedComponentsWithStats(m,connectivity=4)
            for j in range(1,n):
                if st[j,4]<min_area:comps.append((st[j,4],c,cc==j))
                elif st[j,4]<min_area*12:
                    mk_=(cc==j).astype(np.uint8)
                    if cv2.distanceTransform(mk_,cv2.DIST_L2,3).max()<thin:comps.append((st[j,4],c,cc==j))
        if not comps:break
        comps.sort(key=lambda t:t[0])
        for a,c,mask in comps[:max(1,len(comps)//2+1)] if it<30 else comps:
            ring=cv2.dilate(mask.astype(np.uint8),kern)>0
            ring&=~mask
            ns=lbl[ring]
            if ns.size==0:continue
            cnt=np.bincount(ns,minlength=K).astype(float)
            # prefer longest border but penalise colour distance
            d=np.linalg.norm(cent-cent[c],axis=1)
            score=cnt/(1+d/25)
            score[c]=-1
            new[mask]=int(np.argmax(score));changed=True
        lbl=new
        if not changed:break
    # final regions
    regs=[];rid=np.zeros((work,work),np.int32);nid=0
    for c in range(K):
        m=(lbl==c).astype(np.uint8)
        if not m.any():continue
        n,cc,st,_=cv2.connectedComponentsWithStats(m,connectivity=4)
        for j in range(1,n):
            nid+=1;rid[cc==j]=nid;regs.append(dict(c=c,id=nid,area=int(st[j,4])))
    # palette: mean true colour per cluster (BGR from smoothed image), ordered by lightness
    used=sorted({r['c'] for r in regs},key=lambda c:cent[c][0])
    pal=[];remap={}
    for i,c in enumerate(used):
        m=lbl==c;bgr=img[m].mean(axis=0);pal.append('#%02x%02x%02x'%(int(bgr[2]),int(bgr[1]),int(bgr[0])));remap[c]=i+1
    SC=2;UP=3
    out=[]
    for r in sorted(regs,key=lambda r:-r['area']):
        mask=(rid==r['id']).astype(np.uint8)
        up=cv2.resize(mask,(work*UP,work*UP),interpolation=cv2.INTER_NEAREST)
        if dil:up=cv2.dilate(up,np.ones((2*dil+1,2*dil+1),np.uint8))
        cs,hier=cv2.findContours(up,cv2.RETR_CCOMP,cv2.CHAIN_APPROX_NONE)
        d=''
        for ci,cn in enumerate(cs):
            if len(cn)<8:continue
            P=cn[:,0,:].astype(np.float32)
            k=int(max(2,min(len(P)//6,UP*sig)))
            ker=np.exp(-0.5*(np.arange(-3*k,3*k+1)/k)**2);ker/=ker.sum()
            Pp=np.concatenate([P[-3*k:],P,P[:3*k]]);
            sx=np.convolve(Pp[:,0],ker,'same')[3*k:-3*k];sy=np.convolve(Pp[:,1],ker,'same')[3*k:-3*k]
            Q=np.stack([sx,sy],1).reshape(-1,1,2).astype(np.float32)
            Q=cv2.approxPolyDP(Q,UP*0.35,True)[:,0,:]
            if len(Q)<3:continue
            V=np.round((Q+0.5)*SC/UP).astype(int)  # to viewBox units (work*SC)
            # dedupe consecutive
            V=[tuple(v) for i,v in enumerate(V) if i==0 or tuple(v)!=tuple(V[i-1])]
            if len(V)<3:continue
            # smooth quadratic through midpoints, relative commands
            def mid(a,b):return ((a[0]+b[0])/2,(a[1]+b[1])/2)
            n=len(V);m0=mid(V[-1],V[0]);cur=(round(m0[0]),round(m0[1]));seg='M%d %d'%cur
            for i in range(n):
                p=V[i];q=V[(i+1)%n];mm=mid(p,q);e=(round(mm[0]),round(mm[1]))
                seg+='q%d %d %d %d'%(p[0]-cur[0],p[1]-cur[1],e[0]-cur[0],e[1]-cur[1]);cur=e
            d+=seg+'Z'
        if not d:continue
        dt=cv2.distanceTransform(np.pad(mask,1),cv2.DIST_L2,5)[1:-1,1:-1]
        yy,xx=np.unravel_index(np.argmax(dt),dt.shape)
        out.append(dict(n=remap[r['c']],d=d,lx=round((xx+.5)*SC,1),ly=round((yy+.5)*SC,1),lm=round(float(dt[yy,xx])*SC,1),area=r['area']))
    vb=work*SC
    # order: big first (holes handled by evenodd)
    entry=dict(id=pid,name=name,level=level,cat='nature',real=1,viewBox=f'0 0 {vb} {vb}',palette=pal,regions=[dict(n=o['n'],d=o['d'],lx=o['lx'],ly=o['ly'],lm=o['lm']) for o in out])
    return entry,img,lbl,out
def preview(entry,img,path):
    pass
if __name__=='__main__':
    src,pid,name,level,K,ma=sys.argv[1:7];flat=int(sys.argv[7]) if len(sys.argv)>7 else 1;kw=json.loads(sys.argv[8]) if len(sys.argv)>8 else {}
    e,img,lbl,out=build(src,pid,name,level,int(K),int(ma),flat=flat,**kw)
    print(pid,'regions',len(e['regions']),'colors',len(e['palette']),'bytes',sum(len(o['d']) for o in out),'minarea',min(o['area'] for o in out))
    json.dump(e,open(f'{pid}.json','w'))
