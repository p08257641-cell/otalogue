import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml

doc = Document()

# Set standard page margins (0.75 inch)
for section in doc.sections:
    section.top_margin = Inches(0.75)
    section.bottom_margin = Inches(0.75)
    section.left_margin = Inches(0.85)
    section.right_margin = Inches(0.85)

# Colors
COLOR_BLACK = RGBColor(0, 0, 0)
COLOR_RED = RGBColor(185, 28, 28)          # Deep Crimson Red #B91C1C (matching reference header)
COLOR_DARK = RGBColor(15, 23, 42)
COLOR_MUTED = RGBColor(71, 85, 105)

# 1. Header Table: Left (Crest/Logo) | Right (Large Organization Text)
table = doc.add_table(rows=1, cols=2)
table.alignment = WD_TABLE_ALIGNMENT.CENTER
table.autofit = False

logo_path = r'C:\Users\inspy\.gemini\antigravity\scratch\medrobe-by-lene\assets\images\fhumsa_logo.png'

cell_left = table.cell(0, 0)
cell_left.width = Inches(1.5)
cell_left.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
p_logo = cell_left.paragraphs[0]
p_logo.alignment = WD_ALIGN_PARAGRAPH.LEFT
r_logo = p_logo.add_run()
try:
    r_logo.add_picture(logo_path, width=Inches(1.25))
except Exception as e:
    pass

cell_right = table.cell(0, 1)
cell_right.width = Inches(5.2)
cell_right.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
p_hdr = cell_right.paragraphs[0]
p_hdr.paragraph_format.line_spacing = 1.15
p_hdr.paragraph_format.space_after = Pt(0)

r_h1 = p_hdr.add_run('MEDICAL STUDENTS\' ASSOCIATION\n')
r_h1.font.name = 'Arial Black'
r_h1.font.size = Pt(17)
r_h1.font.bold = True
r_h1.font.color.rgb = COLOR_BLACK

r_h2 = p_hdr.add_run('FAMILY HEALTH UNIVERSITY\n')
r_h2.font.name = 'Arial'
r_h2.font.size = Pt(13)
r_h2.font.bold = True
r_h2.font.color.rgb = COLOR_RED

r_h3 = p_hdr.add_run('Office of the Financial Secretary — Elect · Accra (Ghana)')
r_h3.font.name = 'Arial'
r_h3.font.size = Pt(9.5)
r_h3.font.bold = True
r_h3.font.color.rgb = COLOR_BLACK

# 2. Main Statement Title
p_title = doc.add_paragraph()
p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_title.paragraph_format.space_before = Pt(16)
p_title.paragraph_format.space_after = Pt(4)

r_title = p_title.add_run('OFFICIAL ACCEPTANCE & APPRECIATION STATEMENT ON THE 2026 FHUMSA GENERAL ELECTIONS')
r_title.font.name = 'Arial'
r_title.font.size = Pt(11.5)
r_title.font.bold = True
r_title.font.color.rgb = COLOR_BLACK

# Date
p_date = doc.add_paragraph()
p_date.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_date.paragraph_format.space_before = Pt(0)
p_date.paragraph_format.space_after = Pt(10)

r_date = p_date.add_run('Friday, 21st August 2026')
r_date.font.name = 'Georgia'
r_date.font.size = Pt(10)
r_date.font.italic = True
r_date.font.color.rgb = COLOR_DARK

# Separator Line
p_sep = doc.add_paragraph()
p_sep.paragraph_format.space_after = Pt(12)
p_sep_border = parse_xml(r'<w:pBdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:bottom w:val="single" w:sz="12" w:space="1" w:color="000000"/></w:pBdr>')
p_sep._p.get_or_add_pPr().append(p_sep_border)

# 3. Body Text
def add_para(lead, body_text):
    p = doc.add_paragraph()
    p.paragraph_format.line_spacing = 1.2
    p.paragraph_format.space_after = Pt(9)
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    if lead:
        r_lead = p.add_run(lead + ' ')
        r_lead.font.name = 'Times New Roman'
        r_lead.font.size = Pt(11)
        r_lead.font.bold = True
        r_lead.font.color.rgb = COLOR_BLACK
    r_body = p.add_run(body_text)
    r_body.font.name = 'Times New Roman'
    r_body.font.size = Pt(11)
    r_body.font.color.rgb = COLOR_BLACK
    return p

add_para(None, 'Following the successful conclusion of the 2026 Family Health University Medical Students’ Association (FHUMSA) General Elections, the newly elected Financial Secretary, Charlene Odei Asare, issues this official statement of appreciation and commitment to the entire student body and fraternity.')

add_para('WE DID IT.', 'To everyone who believed, encouraged, and voted—thank you. I am deeply humbled and honored by the overwhelming support. I won\'t take your trust for granted.')

add_para('First, the mandate is clear.', 'Winning wasn’t the finish line; it was the starting point. I step into this office with one unwavering mindset: WORK. SERVE. DELIVER.')

add_para('Second, our accountability begins immediately.', 'I want my tenure felt, not just remembered. Seen in tangible improvements, transparent financial stewardship, and prudent resource management—not just promised on campaign platforms.')

add_para('Third, we build together.', 'FHUMSA, you gave me the mandate; now watch me put it to work. We are committed to serving every medical student with integrity, diligence, and dedication.')

add_para(None, 'CAMPAIGN OVER. SERVICE BEGINS.')

# 4. Signature Block
sig_path = r'C:\Users\inspy\.gemini\antigravity\scratch\medrobe-by-lene\assets\images\charlene_signature.png'

p_sig_img = doc.add_paragraph()
p_sig_img.paragraph_format.space_before = Pt(10)
p_sig_img.paragraph_format.space_after = Pt(0)
r_s = p_sig_img.add_run()
try:
    r_s.add_picture(sig_path, width=Inches(1.8))
except Exception as e:
    pass

p_sign = doc.add_paragraph()
p_sign.paragraph_format.space_after = Pt(20)

r_name = p_sign.add_run('CHARLENE ODEI ASARE\n')
r_name.font.name = 'Arial'
r_name.font.size = Pt(11)
r_name.font.bold = True
r_name.font.color.rgb = COLOR_BLACK

r_role = p_sign.add_run('FINANCIAL SECRETARY — ELECT\nFAMILY HEALTH UNIVERSITY MEDICAL STUDENTS\' ASSOCIATION (FHUMSA)')
r_role.font.name = 'Arial'
r_role.font.size = Pt(9.5)
r_role.font.bold = True
r_role.font.color.rgb = COLOR_BLACK

# 5. Bottom Footer Strip
p_foot = doc.add_paragraph()
p_foot.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_foot.paragraph_format.space_before = Pt(16)
p_foot_border = parse_xml(r'<w:pBdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:top w:val="single" w:sz="18" w:space="4" w:color="B91C1C"/></w:pBdr>')
p_foot._p.get_or_add_pPr().append(p_foot_border)

r_phone = p_foot.add_run('  +233 24 563 6351 / 0245636351  ·  fhumsa@fhu.edu.gh')
r_phone.font.name = 'Arial'
r_phone.font.size = Pt(10)
r_phone.font.bold = True
r_phone.font.color.rgb = COLOR_BLACK

out_file = r'C:\Users\inspy\.gemini\antigravity\scratch\medrobe-by-lene\FHUMSA_Press_Release_Charlene_Odei_Asare.docx'
doc.save(out_file)
print(f'Successfully generated official formal document: {out_file}')
