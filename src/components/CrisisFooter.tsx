/**
 * Persistent crisis resource footer for assessment-related pages.
 * Appears on: Profile (quiz), Results, Conversation pages only.
 */
export function CrisisFooter() {
  return (
    <div className="py-6 text-center">
      <p className="text-[0.8125rem] leading-[1.6] text-text-faint">
        If you are in crisis or need immediate support: call or text{' '}
        <strong className="font-semibold">988</strong> (Suicide &amp; Crisis Lifeline, 24/7) | Text HOME to{' '}
        <strong className="font-semibold">741741</strong> (Crisis Text Line)
      </p>
    </div>
  );
}
