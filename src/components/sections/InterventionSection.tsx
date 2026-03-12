import { useState } from 'react';
import { RevealSection } from '@/components/RevealSection';
import { supabase } from '@/integrations/supabase/client';
import { ChevronDown, Download } from 'lucide-react';
import calendarPreview from '@/assets/pepper-sauce-challenge-calendar-preview.png';
import { cn } from '@/lib/utils';

function PassTheSauceForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatYouDid, setWhatYouDid] = useState('');
  const [whatJoyFeltLike, setWhatJoyFeltLike] = useState('');
  const [dayNumber, setDayNumber] = useState('');
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!whatYouDid.trim()) e.whatYouDid = 'This field is required.';
    if (!whatJoyFeltLike.trim()) e.whatJoyFeltLike = 'This field is required.';
    if (!permissionGranted) e.permission = 'This field is required.';
    if (!ageConfirmed) e.age = 'This field is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setGlobalError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('submit-challenge', {
        body: {
          name: name.trim() || null,
          email: email.trim() || null,
          what_you_did: whatYouDid.trim(),
          what_joy_felt_like: whatJoyFeltLike.trim(),
          day_number: dayNumber || null,
          permission_granted: permissionGranted,
          age_confirmed: ageConfirmed,
        },
      });
      if (error) throw error;
      if (data?.error === 'rate_limit') {
        setGlobalError(data.message || "You've submitted recently. Please wait a bit before submitting again.");
        return;
      }
      if (data?.error) throw new Error(data.error);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setGlobalError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase = "w-full rounded bg-dark border font-body text-[15px] text-cream placeholder:text-cream-mid/50 px-4 py-3 focus:outline-none focus:border-gold transition-colors";
  const borderNormal = "border-gold/30";
  const borderError = "border-gold";

  if (submitted) {
    return (
      <div id="pass-the-sauce-form" className="mx-auto mt-12 max-w-[540px] rounded-lg border border-gold/20 bg-dark-warm px-8 py-10 text-center">
        <h4 className="font-display text-[20px] font-bold text-gold">Your sauce has been passed.</h4>
        <p className="mt-4 font-body text-[15px] leading-[1.8] text-cream-mid">
          Thank you for sharing your recipe. Someone out there is carrying pain right now and wondering if joy is still possible. What you just wrote might be the thing that tells them it is.
        </p>
        <p className="mt-4 font-accent text-[14px] italic text-cream-mid/80">
          Pain is real. Joy is possible. Make life delicious.
        </p>
      </div>
    );
  }

  return (
    <form id="pass-the-sauce-form" onSubmit={handleSubmit} className="mx-auto mt-12 max-w-[540px] rounded-lg border border-gold/20 bg-dark-warm p-8">
      <h4 className="text-center font-display text-[20px] font-bold text-gold">Pass the Sauce</h4>
      <p className="mt-2 text-center font-body text-[14px] italic text-cream-mid">
        Tell us about your act of defiant joy. We read every submission.
      </p>
      <p className="mt-1 text-center font-body text-[12px] text-cream-mid/50">
        You must be 18 or older to submit.
      </p>

      {globalError && (
        <p className="mt-4 text-center font-body text-[13px] text-gold/80">{globalError}</p>
      )}

      <div className="mt-6 space-y-5">
        {/* Name */}
        <input
          type="text"
          placeholder="Your first name (or stay anonymous)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${inputBase} ${borderNormal}`}
        />

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Your email (only if you'd like us to follow up)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${inputBase} ${borderNormal}`}
          />
          <p className="mt-1 font-body text-[12px] text-cream-mid/50">
            We'll never share this. Only used if you want to hear from us.
          </p>
        </div>

        {/* What did you do? */}
        <div>
          <textarea
            placeholder="What was your act of defiant joy today?"
            rows={3}
            value={whatYouDid}
            onChange={(e) => { setWhatYouDid(e.target.value); if (errors.whatYouDid) setErrors(p => ({ ...p, whatYouDid: '' })); }}
            className={`${inputBase} ${errors.whatYouDid ? borderError : borderNormal} resize-y`}
          />
          {errors.whatYouDid && <p className="mt-1 font-body text-[12px] text-gold/80">{errors.whatYouDid}</p>}
        </div>

        {/* What did joy feel like? */}
        <div>
          <textarea
            placeholder="What did the joy feel like while the pain was still there?"
            rows={3}
            value={whatJoyFeltLike}
            onChange={(e) => { setWhatJoyFeltLike(e.target.value); if (errors.whatJoyFeltLike) setErrors(p => ({ ...p, whatJoyFeltLike: '' })); }}
            className={`${inputBase} ${errors.whatJoyFeltLike ? borderError : borderNormal} resize-y`}
          />
          {errors.whatJoyFeltLike && <p className="mt-1 font-body text-[12px] text-gold/80">{errors.whatJoyFeltLike}</p>}
        </div>

        {/* Day number */}
        <select
          value={dayNumber}
          onChange={(e) => setDayNumber(e.target.value)}
          className={`${inputBase} ${borderNormal}`}
        >
          <option value="">Which day of the Challenge?</option>
          <option value="Day 1">Day 1</option>
          <option value="Day 2">Day 2</option>
          <option value="Day 3">Day 3</option>
          <option value="Day 4">Day 4</option>
          <option value="Day 5">Day 5</option>
          <option value="Day 6">Day 6</option>
          <option value="Day 7">Day 7</option>
          <option value="After Day 7">After Day 7</option>
        </select>

        {/* Permission checkbox */}
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={permissionGranted}
              onChange={(e) => { setPermissionGranted(e.target.checked); if (errors.permission) setErrors(p => ({ ...p, permission: '' })); }}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-gold"
            />
            <span className="font-body text-[14px] leading-[1.6] text-cream-mid">
              I give permission for The Pepper Sauce Principle™ to share my story (anonymously or with my first name) to inspire others at the table.
            </span>
          </label>
          {errors.permission && <p className="mt-1 pl-7 font-body text-[12px] text-gold/80">{errors.permission}</p>}
        </div>

        {/* Age checkbox */}
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={ageConfirmed}
              onChange={(e) => { setAgeConfirmed(e.target.checked); if (errors.age) setErrors(p => ({ ...p, age: '' })); }}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-gold"
            />
            <span className="font-body text-[14px] leading-[1.6] text-cream-mid">
              I confirm that I am 18 years of age or older.
            </span>
          </label>
          {errors.age && <p className="mt-1 pl-7 font-body text-[12px] text-gold/80">{errors.age}</p>}
        </div>

        {/* Privacy link */}
        <p className="text-center font-body text-[12px] text-cream-mid/50">
          By submitting, you agree to our{' '}
          <a href="/privacy" className="underline transition-colors hover:text-cream-mid">Privacy Policy</a>.
        </p>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-gold py-4 font-body text-sm font-bold uppercase tracking-[0.12em] text-dark transition-colors hover:bg-gold-light disabled:opacity-60"
        >
          {submitting ? 'Submitting…' : 'Pass the Sauce'}
        </button>
      </div>
    </form>
  );
}

const EXAMPLES = [
  "Cooking a meal with real heat in it. Scotch bonnet, habanero, whatever your kitchen allows. Eating it slowly, on purpose.",
  "Putting on a song that used to make you move, and moving. However your body moves today. No audience required.",
  "Sitting on a porch with someone who doesn't need you to explain how you feel, and laughing about something that has nothing to do with pain.",
  "Wearing something you love that's been sitting in the closet. Putting it on anyway.",
  "Going to the water. A lake, a pool, a bathtub. Letting your body remember what it feels like to be held.",
  "Making something with your hands. Bread, a drawing, a garden row. Letting the making be the point.",
  "Calling someone you love and telling them something true and funny that happened this week. A life update, not a health update.",
  "Tasting something your grandmother made, or something that reminds you of a kitchen where pain wasn't the main ingredient.",
];

function CollapsibleBlock({ trigger, children }: { trigger: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between gap-4 text-left font-body text-[16px] leading-[1.8] text-cream-mid transition-colors hover:text-cream"
      >
        <span>{trigger}</span>
        <ChevronDown
          size={20}
          className={cn(
            'shrink-0 text-gold transition-transform duration-300',
            open && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-400',
          open ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function InterventionSection() {
  const shareSubject = encodeURIComponent('Someone shared The Pepper Sauce Challenge with you');
  const shareBody = encodeURIComponent(
`Someone who cares about you thought you should see this.

The Pepper Sauce Challenge is seven days of defiant joy. One act per day. Your recipe, your rules. The only requirement: for seven days, you do something that matters to you. The pain may still be there. But surrounded by joy, by connection, by something worth doing, pain stops being the whole story. It becomes one ingredient in a life that has its flavor back.

It was made for people who live with pain and have been told the best they can hope for is coping. It asks a different question: what if joy is possible alongside the pain, and what if you proved it to yourself in seven days?

Start here: https://peppersauceprinciple.com/#seven-days

Pain is real. Joy is possible. Make life delicious.`
  );

  return (
    <section
      className="sec-dark relative bg-dark py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]"
      id="challenge"
    >
      <div className="mx-auto max-w-[620px]">

        {/* 1. PROFESSOR STORY (above challenge title, encountered by scrolling) */}
        <RevealSection>
          <div className="text-center">
            <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
              The Pepper Sauce Challenge
            </span>
          </div>
        </RevealSection>

        <RevealSection>
          <div className="mt-10 space-y-6 border-l-[3px] border-gold/15 pl-5 font-body text-[16px] leading-[1.8] text-cream-mid">
            <p>
              A professor I worked with loved teaching the way some people love breathing. The pacing, the whiteboard, the way she could hold a room in her hands. When chronic pain put her in a wheelchair, she could still do all of it. But not the way she used to. And she couldn't bear the thought of her students watching her struggle. She couldn't bear her colleagues seeing her stand on good days and sit on bad ones, and what they'd think. So she made a quiet, reasonable decision. She stopped.
            </p>
          </div>

          <div className="mt-8 pl-5">
            <CollapsibleBlock trigger="Read her story">
              <div className="space-y-6 border-l-[3px] border-gold/15 pl-5 font-body text-[16px] leading-[1.8] text-cream-mid">
                <p>
                  She told herself it was practical. She'd slow the students down. She'd be a burden. She'd have to explain the wheelchair one day and the cane the next, and the days she walked in looking fine. She imagined the sideways looks. The whispered "but she seemed okay yesterday." She imagined smiling during a lecture and someone deciding her pain must not be that bad after all.
                </p>
                <p>
                  So she chose the version of herself that would be believed. The one at home. The one in pain. The small office, the small projects, the small life.
                </p>
                <p>
                  Her world shrank. One concession at a time. One "I can't do it like I used to" at a time. The things that gave her life flavor disappeared slowly. First the teaching. Then the colleagues. Then the lunches, the conferences, the jokes in the hallway, the version of herself that laughed easily. Until what remained was all heat and no sauce. Pain with nothing around it. Scorching.
                </p>
              </div>

              <p className="my-10 text-center font-accent text-[17px] italic leading-[1.5] text-cream">
                She didn't lose her legs. She lost her sauce.
              </p>

              <div className="space-y-6 border-l-[3px] border-gold/15 pl-5 font-body text-[16px] leading-[1.8] text-cream-mid">
                <p>
                  Here's what happened, and it happens to people living with chronic pain every single day. She believed that her joy and her pain could not exist in the same room. That if people saw her laughing, they'd stop believing she was hurting. That the cost of being visible and alive and in pain would be judgment, disbelief, and invalidation. So she paid a different cost instead. She gave up the thing she loved to protect herself from a world that punishes people for being sick and happy at the same time.
                </p>
                <p>
                  We call that the joy penalty. And it is one of the most devastating forces in chronic illness. Not the pain itself. The slow, logical, perfectly reasonable decision to stop doing the things that made the pain worth carrying.
                </p>
                <p>
                  Her humor was still there. Her depth. Her ability to make a room full of students forget to check their phones. Those didn't need a whiteboard. They didn't need her legs. They needed a table. A place where she could bring what she had, alongside the pain, and let both be true at the same time.
                </p>
                <p>
                  And the students who would have watched a brilliant woman teach from a chair? Who would have seen that passion doesn't require standing? Who would have learned that a life with pain can still be a life that matters? They never got that lesson. They needed her. And she needed them. And nobody told either of them.
                </p>
              </div>

              <p className="my-6 border-l-[3px] border-gold/15 pl-5 font-body text-[12px] italic text-cream-mid/50">
                This story is a de-identified composite drawn from clinical experience. It does not describe any specific individual.
              </p>

              <div className="space-y-6 font-body text-[16px] leading-[1.8] text-cream-mid">
                <p>
                  Here's what nobody told her, and what nobody may have told you:
                </p>
                <p>
                  There is no good time to start. There will always be a reason not to. The pain. The energy. The money. The uncertainty about how it will go. The fear that people will see you struggle. The voice in your own head that says: who are you to be out here laughing when you can barely get through the day?
                </p>
                <p>
                  That voice taught you to shrink. To dim what was bright in you so that what hurt in you would be believed. It is the voice of every system, every sideways look, every "but you seemed fine yesterday" that trained you to disappear into the pain instead of living fully.
                </p>
              </div>

              <p className="my-12 text-center font-display text-[clamp(1.2rem,3vw,1.4rem)] font-bold leading-[1.4] text-gold">
                The Pepper Sauce Principle says: enough.
              </p>

              <div className="space-y-6 font-body text-[16px] leading-[1.8] text-cream-mid">
                <p>
                  Your pain is real. It doesn't leave when joy arrives. But joy doesn't have to leave when pain arrives either. They can sit at the same table. They have to. Because the alternative, a life where pain is the only ingredient, is not protection. It's a slow vanishing.
                </p>
                <p>
                  You have a pepper sauce recipe that is yours alone. The specific combination of what lights you up, what you bring to a room, what people taste when they're around you. Pain is one ingredient. It may be a strong one. But it was never meant to be the only one.
                </p>
                <p>
                  The Pepper Sauce Challenge is an invitation to bring the rest of your recipe back.
                </p>
                <p className="text-cream">
                  Welcome to The Table. There are people here who need what you carry. And they have something to pass to you.
                </p>
              </div>
            </CollapsibleBlock>
          </div>
        </RevealSection>

        {/* 3. CHALLENGE INTRO */}
        <RevealSection>
          <div className="space-y-6 font-body text-[16px] leading-[1.8] text-cream-mid">
            <p>
              We are leveling a challenge. Not a wellness assignment. Not a self-care checklist. A challenge. The kind that requires something of you.
            </p>
          </div>
        </RevealSection>

        {/* === CHALLENGE TITLE (nav anchor) === */}
        <RevealSection>
          <div className="mt-10 text-center" id="seven-days">
            <div className="mx-auto mb-6 h-[2px] w-[60px] bg-gold" />
            <h3 className="font-display text-[clamp(1.3rem,3vw,1.5rem)] font-bold text-gold">
              The Pepper Sauce Challenge: Seven Days of Defiant Joy.
            </h3>
          </div>

          {/* Share button */}
          <div className="my-4 text-center">
            <a
              href={`mailto:?subject=${shareSubject}&body=${shareBody}`}
              className="inline-block rounded-md border border-gold bg-transparent px-6 py-2.5 font-body text-[14px] text-gold transition-colors hover:bg-gold/10"
            >
              Share This Challenge With Someone Who Needs It
            </a>
          </div>

          {/* Description */}
          <div className="mt-6 space-y-6 font-body text-[16px] leading-[1.8] text-cream-mid">
            <p>
              One act of defiant joy per day for seven days. The same act repeated, or a different one each time. Your recipe, your rules. The only requirement: for seven days, you do something that matters to you. The pain may still be there. But surrounded by joy, by connection, by something worth doing, pain stops being the whole story. It becomes one ingredient in a life that has its flavor back.
            </p>
          </div>

          {/* Collapsible examples */}
          <div className="mt-8">
            <CollapsibleBlock trigger="Need a place to start? Here's what defiant joy has looked like for others:">
              <ul className="list-disc space-y-3 pl-6">
                {EXAMPLES.map((ex, i) => (
                  <li key={i} className="font-body text-[16px] leading-[1.8] text-cream-mid">
                    {ex}
                  </li>
                ))}
              </ul>
            </CollapsibleBlock>
          </div>

          {/* Collapsible rules */}
          <div className="mt-8">
            <CollapsibleBlock trigger="But the act has rules. These matter.">
              <div className="space-y-8">
                <div className="border-l-2 border-gold/40 pl-6">
                  <h4 className="font-display text-[18px] font-bold text-gold">
                    It must be authentic to who you are now.
                  </h4>
                  <div className="mt-3 space-y-4 font-body text-[16px] leading-[1.8] text-cream-mid">
                    <p>
                      Not who you were before pain arrived. Not the version of you that could dance for three hours, run five miles, cook a feast standing up. That's how you used to do things. It is not who you are.
                    </p>
                    <p>
                      Who you are is your sense of humor. Your taste. The music that still hits you somewhere behind your sternum. The people whose laughter changes the temperature of a room. The food that reminds you of someone who loved you before you knew what pain was.
                    </p>
                    <p>
                      Start there. Not with what you've lost. With what's still true.
                    </p>
                  </div>
                </div>

                <div className="border-l-2 border-gold/40 pl-6">
                  <h4 className="font-display text-[18px] font-bold text-gold">
                    It must involve your body.
                  </h4>
                  <div className="mt-3 space-y-4 font-body text-[16px] leading-[1.8] text-cream-mid">
                    <p>
                      Not necessarily movement. Sensation. The feel of cold water. The taste of something with actual heat in it. Music loud enough to feel in your chest. Singing badly. Dancing in whatever way your body allows today, not the way it used to. Your body carries the pain. Your body also carries the capacity for pleasure. Both live in the same nervous system. The challenge insists they meet.
                    </p>
                  </div>
                </div>

                <div className="border-l-2 border-gold/40 pl-6">
                  <h4 className="font-display text-[18px] font-bold text-gold">
                    It can be uncomfortable.
                  </h4>
                  <div className="mt-3 space-y-4 font-body text-[16px] leading-[1.8] text-cream-mid">
                    <p>
                      Discomfort and joy coexist. That's the whole principle. You might feel self-conscious. You might feel rusty. You might feel the pain the entire time. That doesn't disqualify the joy. Pepper sauce burns your mouth and is still delicious. You are allowed to hurt and laugh in the same breath.
                    </p>
                  </div>
                </div>

                <div className="border-l-2 border-gold/40 pl-6">
                  <h4 className="font-display text-[18px] font-bold text-gold">
                    It should be shared, if possible.
                  </h4>
                  <div className="mt-3 space-y-4 font-body text-[16px] leading-[1.8] text-cream-mid">
                    <p>
                      Not required. But the challenge is richer at a table. Call someone. Invite someone. Do the thing alongside another person who understands that joy in the presence of pain is not denial. It is defiance.
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleBlock>
          </div>
        </RevealSection>

        {/* 4. THE REAL DIFFICULTY (collapsible) */}
        <RevealSection>
          <div className="mt-8">
            <CollapsibleBlock trigger="Why this is harder than it sounds.">
              <div className="space-y-6 font-body text-[16px] leading-[1.8] text-cream-mid">
                <p>
                  It is not the doing. It is believing you are allowed to.
                </p>
                <p>
                  If you have been living with pain for a while, you already know: joy comes with a cost. You laugh too loud one day and someone says, "You seemed fine yesterday." You show up looking good and someone wonders why you still need accommodations. So you learn. You silence the joy. You dim what is bright in you so that what hurts in you will be believed.
                </p>
                <p>
                  The Pepper Sauce Principle has a name for this. It is called the Joy Penalty: the punishment people living with pain receive for daring to look like they feel good. It is real. It is common. And it is the thing this challenge is designed to push back against.
                </p>
                <p>
                  Day 1 is the hardest. Every reason to wait lives there. Do it anyway. Your body has been asked to carry pain for a long time. It deserves to carry something else alongside it. You will be in good company. The blues musicians who held anguish and craft in the same breath did this. The grandmother who stirred scotch bonnet into sauce at a table full of people who knew what the burn tasted like did this. And now you. Tonight.
                </p>
              </div>
            </CollapsibleBlock>
          </div>
        </RevealSection>

        {/* 6. PASS THE SAUCE */}
        <RevealSection>
          <div className="mt-16 space-y-6 font-body text-[16px] leading-[1.8] text-cream-mid">
            <p>
              When you do it (and you will), come back and Pass the Sauce.
            </p>
            <p>
              Tell us what you did. We want to hear what the joy felt like while the pain was still there. That's the testimony the world needs. That's the recipe someone else is waiting for.
            </p>
          </div>

          <div className="mt-8 text-center">
            <a
              href="#pass-the-sauce-form"
              className="inline-block rounded-md bg-gold px-8 py-4 font-body text-sm font-bold uppercase tracking-[0.12em] text-dark transition-colors hover:bg-gold-light"
            >
              Pass the Sauce →
            </a>
            <p className="mt-3 font-body text-[14px] italic text-cream-mid/70">
              Share your story with us. We read every one.
            </p>
          </div>

          <div className="mt-8 space-y-6 font-body text-[16px] leading-[1.8] text-cream-mid">
            <p>
              Or share it with the world. Post on social media with the tags so we can find each other:
            </p>
          </div>

          <div className="mt-8 text-center font-body text-[17px] font-bold leading-[2.2] text-gold">
            <p>#PepperSauceChallenge</p>
            <p>#PassTheSauce</p>
            <p>#PainIsReal</p>
            <p>#JoyIsPossible</p>
            <p>#MakeLifeDelicious</p>
          </div>

          <div className="mt-8 text-center font-accent text-[16px] italic text-cream-mid">
            <p>Because this was never meant to be practiced alone.</p>
            <p className="mt-2">The Table is forming. You're already at it.</p>
          </div>
        </RevealSection>

        {/* 7. SUBMISSION FORM */}
        <RevealSection>
          <PassTheSauceForm />
        </RevealSection>

        {/* 8. CTA BUTTON */}
        <RevealSection>
          <div className="mt-12 text-center">
            <a
              href="#seven-days"
              className="inline-block rounded-md bg-gold px-8 py-4 font-body text-sm font-bold uppercase tracking-[0.12em] text-dark transition-colors hover:bg-gold-light"
            >
              Take the Pepper Sauce Challenge
            </a>
            <p className="mt-4 font-body text-[14px] italic text-cream-mid/70">
              Seven days of defiant joy. Starts tonight.
            </p>
            <a
              href="/go-deeper"
              className="mt-6 inline-block font-body text-[14px] text-gold-muted transition-colors hover:text-gold"
            >
              Go deeper: the science and cultural wisdom behind the Challenge →
            </a>
          </div>
        </RevealSection>

      </div>
    </section>
  );
}
