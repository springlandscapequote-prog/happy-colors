# usage: render.py <base_url> <id> [out.png]  -> screenshot of the picture fully colored (design check)
import sys,asyncio
from playwright.async_api import async_playwright
URL,pid=sys.argv[1],sys.argv[2];out=sys.argv[3] if len(sys.argv)>3 else f'/tmp/{pid}-full.png'
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch();pg=await b.new_page(viewport={'width':700,'height':700})
  await pg.goto(URL,wait_until='networkidle')
  await pg.evaluate("""(id)=>{const p=PICTURES.find(x=>x.id==id);document.querySelector('#welcome').style.display='none';open(p);}""",pid)
  await pg.wait_for_timeout(500)
  info=await pg.evaluate("""()=>{document.querySelectorAll('#art path').forEach(e=>e.setAttribute('fill',pic.palette[e.dataset.number-1]));return [pic.regions.length,document.querySelectorAll('#art text').length]}""")
  print(pid,'regions,labels',info)
  await pg.screenshot(path=out);await b.close()
asyncio.run(main())
