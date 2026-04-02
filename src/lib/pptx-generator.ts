import PptxGenJS from 'pptxgenjs';
import { ProjectData, CompetitorEntry } from './projects';
import { AnalysisSummary } from './analysis';

export async function generateAnalysisDeck(
  project: ProjectData,
  summary: AnalysisSummary
): Promise<Buffer> {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'Cinematic Sites Platform - VioX AI';

  const COLORS = {
    bg: '0A0A0F',
    surface: '141420',
    accent: '6C5CE7',
    accentLight: 'A29BFE',
    text: 'E8E8F0',
    muted: '8888A0',
    success: '00B894',
    warning: 'FDCB6E',
    danger: 'E17055',
  };

  // Slide 1: Title
  const slide1 = pptx.addSlide();
  slide1.background = { color: COLORS.bg };
  slide1.addText('COMPETITIVE MARKET ANALYSIS', {
    x: 0.8,
    y: 1.5,
    w: '80%',
    fontSize: 36,
    fontFace: 'Arial',
    color: COLORS.accentLight,
    bold: true,
  });
  slide1.addText(project.client.name, {
    x: 0.8,
    y: 2.5,
    w: '80%',
    fontSize: 48,
    fontFace: 'Arial',
    color: COLORS.text,
    bold: true,
  });
  slide1.addText(
    `${project.client.businessType?.replace('-', ' ').toUpperCase()} | ${new Date().toLocaleDateString()}`,
    {
      x: 0.8,
      y: 3.5,
      w: '80%',
      fontSize: 16,
      fontFace: 'Arial',
      color: COLORS.muted,
    }
  );
  slide1.addText('Prepared by VioX AI - Cinematic Sites Platform', {
    x: 0.8,
    y: 6.5,
    w: '80%',
    fontSize: 12,
    fontFace: 'Arial',
    color: COLORS.muted,
  });

  // Slide 2: Executive Summary
  const slide2 = pptx.addSlide();
  slide2.background = { color: COLORS.bg };
  slide2.addText('EXECUTIVE SUMMARY', {
    x: 0.8,
    y: 0.5,
    w: '80%',
    fontSize: 28,
    fontFace: 'Arial',
    color: COLORS.accentLight,
    bold: true,
  });

  const summaryItems = [
    `Analyzed ${(project.competitive.competitors || []).length} competitors in the ${project.client.businessType} space`,
    `Average competitor design score: ${summary.averageScore}/10`,
    `${summary.missingFromClient.length} key features found missing from client`,
    `${summary.recommendations.length} strategic recommendations identified`,
  ];

  summaryItems.forEach((item, i) => {
    slide2.addText(item, {
      x: 1.0,
      y: 1.5 + i * 0.7,
      w: '75%',
      fontSize: 16,
      fontFace: 'Arial',
      color: COLORS.text,
      bullet: { type: 'number' },
    });
  });

  // Slide 3: Top Competitors Grid
  const competitors = project.competitive.competitors || [];
  const slide3 = pptx.addSlide();
  slide3.background = { color: COLORS.bg };
  slide3.addText('TOP 20 COMPETITORS', {
    x: 0.8,
    y: 0.3,
    w: '80%',
    fontSize: 28,
    fontFace: 'Arial',
    color: COLORS.accentLight,
    bold: true,
  });

  // Table with competitor data
  const tableRows: PptxGenJS.TableRow[] = [
    [
      { text: '#', options: { bold: true, color: COLORS.accent, fill: { color: COLORS.surface }, fontSize: 10 } },
      { text: 'Name', options: { bold: true, color: COLORS.accent, fill: { color: COLORS.surface }, fontSize: 10 } },
      { text: 'Score', options: { bold: true, color: COLORS.accent, fill: { color: COLORS.surface }, fontSize: 10 } },
      { text: 'Standout Feature', options: { bold: true, color: COLORS.accent, fill: { color: COLORS.surface }, fontSize: 10 } },
    ],
  ];

  competitors.slice(0, 20).forEach((comp: CompetitorEntry, i: number) => {
    tableRows.push([
      { text: `${i + 1}`, options: { color: COLORS.muted, fill: { color: i % 2 === 0 ? COLORS.bg : COLORS.surface }, fontSize: 9 } },
      { text: comp.name, options: { color: COLORS.text, fill: { color: i % 2 === 0 ? COLORS.bg : COLORS.surface }, fontSize: 9 } },
      { text: `${comp.designScore || '-'}/10`, options: { color: COLORS.success, fill: { color: i % 2 === 0 ? COLORS.bg : COLORS.surface }, fontSize: 9 } },
      { text: comp.standout, options: { color: COLORS.muted, fill: { color: i % 2 === 0 ? COLORS.bg : COLORS.surface }, fontSize: 9 } },
    ]);
  });

  slide3.addTable(tableRows, {
    x: 0.5,
    y: 1.0,
    w: 12.0,
    border: { type: 'solid', pt: 0.5, color: COLORS.surface },
    colW: [0.5, 3.0, 1.0, 7.5],
  });

  // Slide 4: Gap Analysis
  const slide4 = pptx.addSlide();
  slide4.background = { color: COLORS.bg };
  slide4.addText('GAP ANALYSIS', {
    x: 0.8,
    y: 0.5,
    w: '80%',
    fontSize: 28,
    fontFace: 'Arial',
    color: COLORS.accentLight,
    bold: true,
  });
  slide4.addText('What top competitors have that the client is missing:', {
    x: 0.8,
    y: 1.3,
    w: '80%',
    fontSize: 14,
    fontFace: 'Arial',
    color: COLORS.muted,
  });

  summary.missingFromClient.forEach((item, i) => {
    slide4.addText(item, {
      x: 1.0,
      y: 2.0 + i * 0.5,
      w: '75%',
      fontSize: 16,
      fontFace: 'Arial',
      color: COLORS.warning,
      bullet: true,
    });
  });

  // Slide 5: Recommendations
  const slide5 = pptx.addSlide();
  slide5.background = { color: COLORS.bg };
  slide5.addText('RECOMMENDATIONS', {
    x: 0.8,
    y: 0.5,
    w: '80%',
    fontSize: 28,
    fontFace: 'Arial',
    color: COLORS.accentLight,
    bold: true,
  });

  summary.recommendations.forEach((rec, i) => {
    const impactColor = rec.impact === 'high' ? COLORS.success : rec.impact === 'medium' ? COLORS.warning : COLORS.accentLight;
    slide5.addText(`[${rec.impact.toUpperCase()}] ${rec.title}`, {
      x: 0.8,
      y: 1.5 + i * 1.2,
      w: '80%',
      fontSize: 18,
      fontFace: 'Arial',
      color: impactColor,
      bold: true,
    });
    slide5.addText(rec.description, {
      x: 0.8,
      y: 2.0 + i * 1.2,
      w: '80%',
      fontSize: 13,
      fontFace: 'Arial',
      color: COLORS.muted,
    });
  });

  // Slide 6: Next Steps
  const slide6 = pptx.addSlide();
  slide6.background = { color: COLORS.bg };
  slide6.addText('NEXT STEPS', {
    x: 0.8,
    y: 0.5,
    w: '80%',
    fontSize: 28,
    fontFace: 'Arial',
    color: COLORS.accentLight,
    bold: true,
  });

  const nextSteps = [
    'Approve competitive analysis findings',
    'Begin brand identity extraction and visual direction',
    'Generate cinematic hero animation concepts',
    'Build scroll-driven website with 30+ interactive modules',
    'Deploy to production and configure AI voice agent',
    'Launch digital marketing campaign via Blotato',
  ];

  nextSteps.forEach((step, i) => {
    slide6.addText(`${i + 1}. ${step}`, {
      x: 1.0,
      y: 1.5 + i * 0.7,
      w: '75%',
      fontSize: 16,
      fontFace: 'Arial',
      color: COLORS.text,
    });
  });

  slide6.addText('Cinematic Sites Platform - Powered by VioX AI', {
    x: 0.8,
    y: 6.5,
    w: '80%',
    fontSize: 12,
    fontFace: 'Arial',
    color: COLORS.muted,
    italic: true,
  });

  const output = await pptx.write({ outputType: 'nodebuffer' });
  return output as Buffer;
}
