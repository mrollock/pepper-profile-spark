import { ITEMS, CONDITION_NAMES, LIKERT_LABELS, FIRE_NAMES } from '@/data/quizData';

export function generateQuizText(): string {
  const lines: string[] = [];

  lines.push('THE PEPPER SAUCE PROFILE');
  lines.push('A 34-Item Assessment');
  lines.push('');
  lines.push('='.repeat(60));
  lines.push('');
  lines.push('RESPONSE SCALE (Items 1–29, except fire-type items):');
  lines.push('');
  LIKERT_LABELS.forEach((label, i) => {
    lines.push(`  ${i + 1} = ${label.replace('\n', ' ')}`);
  });
  lines.push('');
  lines.push('='.repeat(60));

  // Group Likert items by condition
  const conditionGroups: Record<number, typeof ITEMS> = {};
  const scovilleItems: typeof ITEMS = [];
  const fireItems: typeof ITEMS = [];

  ITEMS.forEach(item => {
    if (item.type === 'fire') {
      fireItems.push(item);
    } else if (item.scoring === 'scoville') {
      scovilleItems.push(item);
    } else {
      const c = item.condition;
      if (!conditionGroups[c]) conditionGroups[c] = [];
      conditionGroups[c].push(item);
    }
  });

  // Print condition-grouped items
  for (let c = 1; c <= 5; c++) {
    const items = conditionGroups[c];
    if (!items) continue;
    lines.push('');
    lines.push('-'.repeat(60));
    lines.push(`CONDITION ${c}: ${CONDITION_NAMES[c].toUpperCase()}`);
    lines.push('-'.repeat(60));
    lines.push('');
    items.forEach(item => {
      const rev = item.scoring === 'reverse' ? ' [REVERSE SCORED]' : '';
      lines.push(`${item.id}. ${item.text}${rev}`);
      lines.push(`   [ 1 ]  [ 2 ]  [ 3 ]  [ 4 ]  [ 5 ]  [ 6 ]`);
      lines.push('');
    });
  }

  // Scoville gate items
  if (scovilleItems.length > 0) {
    lines.push('');
    lines.push('-'.repeat(60));
    lines.push('SCOVILLE SAFETY GATES');
    lines.push('(Scored ≥ 5 triggers a safety resource screen)');
    lines.push('-'.repeat(60));
    lines.push('');
    scovilleItems.forEach(item => {
      lines.push(`${item.id}. ${item.text}`);
      lines.push(`   [ 1 ]  [ 2 ]  [ 3 ]  [ 4 ]  [ 5 ]  [ 6 ]`);
      lines.push('');
    });
  }

  // Fire-type items
  lines.push('');
  lines.push('='.repeat(60));
  lines.push('FIRE-TYPE QUESTIONS (Items 30–34)');
  lines.push('Select ONE option per question.');
  lines.push('='.repeat(60));
  lines.push('');

  fireItems.forEach(item => {
    const chronic = item.isChronic ? ' [CHRONIC FIRE]' : '';
    lines.push(`${item.id}. ${item.text}${chronic}`);
    lines.push('');
    item.options?.forEach(opt => {
      lines.push(`   [ ${opt.val} ] ${FIRE_NAMES[opt.val]} — ${opt.text}`);
    });
    lines.push('');
  });

  lines.push('='.repeat(60));
  lines.push('');
  lines.push('SCORING GUIDE');
  lines.push('');
  lines.push('Each condition score = sum of its items (reverse items: 7 − raw).');
  lines.push('Range per condition: 5–30.');
  lines.push('');
  lines.push(' 5–12  Scarce      — This ingredient has room to grow.');
  lines.push('13–20  Inconsistent — Present but uneven.');
  lines.push('21–26  Solid        — Well-stocked; a strength to cook from.');
  lines.push('27–30  Abundant     — Enough to share.');
  lines.push('');
  lines.push('Primary Fire Type = most frequent choice across items 30–33.');
  lines.push('Chronic Fire Type = item 34 response.');
  lines.push('');
  lines.push('© The Pepper Sauce Profile');

  return lines.join('\n');
}

export function downloadQuizAsText() {
  const text = generateQuizText();
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Pepper-Sauce-Profile-Quiz.txt';
  a.click();
  URL.revokeObjectURL(url);
}
