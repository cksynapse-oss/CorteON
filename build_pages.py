from pathlib import Path
from html import escape
p=Path(__file__).parent
pages=[
('index.html','home','Synapse | Learning and exam preparation in Chamba','Small-group exam preparation and learning courses in Chamba. View tracks, fees and send an admission enquiry.'),
('programmes.html','programmes','Programmes | Synapse Chamba','Explore engineering, medical, CUET, NDA, communication and business learning courses at Synapse.'),
('engineering-research.html','track','Engineering and Research (PCM) | Synapse Chamba','Physics, Chemistry and Mathematics preparation for JEE, IISER, NEST, CUET, NDA and AIIMS Paramedical.', 'engineering'),
('medical-allied-health.html','track','Medical and Allied Health (PCB) | Synapse Chamba','Physics, Chemistry and Biology preparation for NEET, AIIMS, IISER, NEST and CUET.', 'medical'),
('cuet-general-english.html','track','CUET UG General Test and English | Synapse Chamba','Learn about Synapse preparation for CUET UG General Test and English.', 'general'),
('cuet-arts-commerce-nda.html','track','CUET Arts, Commerce and NDA Army wing | Synapse Chamba','Explore CUET UG Arts and Commerce and UPSC NDA Army wing preparation at Synapse.', 'arts'),
('communication-business.html','track','Communication and Business learning | Synapse Chamba','Communication and business learning courses in Chamba for ₹1,000 per month.', 'communication'),
('how-we-teach.html','approach','How we teach | Synapse Chamba','Learn about small groups, practice tests, doubt clinics and real work at Synapse.'),
('admissions.html','admissions','Admissions and FAQ | Synapse Chamba','Admission steps, baseline test, demo class, fees and frequently asked questions for Synapse.'),
('teacher.html','teacher','About the teacher | Synapse Chamba','Meet the teacher at Synapse and read about the approach to teaching.'),
('contact.html','contact','Contact | Synapse Chamba','Find Synapse behind the Post Office in Chamba. Call or WhatsApp 8287248119.'),
('privacy.html','policy','Privacy policy | Synapse Chamba','How Synapse uses admission enquiry details and how to ask for their deletion.'),
('thank-you.html','thanks','Thank you | Synapse Chamba','Your enquiry to Synapse has been sent. We will call within 24 hours.')]
for fname,page,title,desc,*track in pages:
 url='https://corteon.in/'+('' if fname=='index.html' else fname)
 schema='''{"@context":"https://schema.org","@type":"EducationalOrganization","name":"Synapse","url":"https://corteon.in/","telephone":"+918287248119","email":"cksynapse@mail.com","address":{"@type":"PostalAddress","streetAddress":"Behind the Post Office","addressLocality":"Chamba","addressRegion":"Himachal Pradesh","addressCountry":"IN"}}'''
 txt=f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#ffffff">
  <title>{escape(title)}</title>
  <meta name="description" content="{escape(desc,quote=True)}">
  <link rel="canonical" href="{url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Synapse">
  <meta property="og:title" content="{escape(title,quote=True)}">
  <meta property="og:description" content="{escape(desc,quote=True)}">
  <meta property="og:url" content="{url}">
  <link rel="stylesheet" href="assets/style.css">
  <script type="application/ld+json">{schema}</script>
  <script src="assets/strings.js" defer></script>
  <script src="assets/site.js" defer></script>
</head>
<body data-page="{page}"{f' data-track="{track[0]}"' if track else ''}>
  <div id="app"></div>
  <noscript><main style="padding:24px;font:18px sans-serif"><h1>Synapse</h1><p>Behind the Post Office, Chamba, Himachal Pradesh.</p><p>Classes: Monday to Saturday, 3:30 PM to 6:30 PM. Each student attends five days a week.</p><p>Call <a href="tel:+918287248119">8287248119</a> or <a href="https://wa.me/918287248119">message us on WhatsApp</a> for programme details and admission enquiries.</p><p>This site requires JavaScript for its full programme information and enquiry form.</p></main></noscript>
</body>
</html>
'''
 (p/fname).write_text(txt,encoding='utf-8')
xml='''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
'''+''.join(f'  <url><loc>https://corteon.in/{"" if fn=="index.html" else fn}</loc></url>\n' for fn,*_ in pages)+'''</urlset>
'''
(p/'sitemap.xml').write_text(xml)
(p/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: https://corteon.in/sitemap.xml\n')
print('Generated',len(pages),'pages')
