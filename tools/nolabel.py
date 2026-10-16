import sys,asyncio
from playwright.async_api import async_playwright
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':664})
  await pg.goto(sys.argv[1],wait_until='networkidle')
  for pid in sys.argv[2:]:
   r=await pg.evaluate("""(id)=>{const p=PICTURES.find(x=>x.id==id);open(p);const t=new Set([...document.querySelectorAll('#art text')].map(x=>+x.id.slice(1)));const m=[];p.regions.forEach((r,i)=>{if(!t.has(i))m.push([i,r.n])});return m}""",pid)
   print(pid,'regions without label (index,color):',r)
  await b.close()
asyncio.run(main())
