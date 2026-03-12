import { useState } from 'react';
import { RevealSection } from '@/components/RevealSection';
import { supabase } from '@/integrations/supabase/client';

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
          Thank you for sharing your recipe. Every story like yours is evidence that a spicy and delicious life is possible, and it might be exactly what someone else needs to hear.
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
  "Sitting on a porch with someone who doesn\u2019t need you to explain how you feel, and laughing about something that has nothing to do with pain.",
  "Wearing something you love that\u2019s been sitting in the closet. Putting it on anyway.",
  "Going to the water. A lake, a pool, a bathtub. Letting your body remember what it feels like to be held.",
  "Making something with your hands. Bread, a drawing, a garden row. Letting the making be the point.",
  "Calling someone you love and telling them something true and funny that happened this week. A life update, not a health update.",
  "Tasting something your grandmother made, or something that reminds you of a kitchen where pain wasn\u2019t the main ingredient.",
];

export function InterventionSection() {
  return (
    <section
      className="sec-dark relative bg-dark py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]"
      id="challenge"
    >
      <div className="mx-auto max-w-[620px]">

        {/* 1. EYEBROW + HEADLINE */}
        <RevealSection>
          <div className="text-center">
            <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
              The Pepper Sauce Challenge
            </span>
            <h2 className="text-cream">
              Seven Days. One Act of Joy. No Permission Required.
            </h2>
          <div className="mx-auto mt-6 h-[3px] w-[60px] rounded-sm bg-gold-muted" />
          </div>
        </RevealSection>

        {/* 2. THE STORY */}
        <RevealSection>
          <div className="mt-16 space-y-6 border-l-[3px] border-gold/15 pl-5 font-body text-[16px] leading-[1.8] text-cream-mid">
            <p>
              A professor I worked with stopped teaching the day she started using a wheelchair.
            </p>
            <p>
              Not because she couldn't teach. Because she couldn't teach the way she always had. The whiteboard. The pacing. The movement around the room that made her feel like herself. She decided that if she couldn't do it that way, she wouldn't do it at all.
            </p>
            <p>
              So she worked from home. A small office. Small projects. Her world got smaller. Her students never saw her again. And the people who would have watched a brilliant woman teach from a chair, who would have seen that passion doesn't require standing, who would have learned that a life with pain can still be one that matters&nbsp;&mdash; they never got that lesson.
            </p>
          </div>
        </RevealSection>

        <RevealSection>
          <p className="my-10 text-center font-accent text-[17px] italic leading-[1.5] text-cream">
            She didn't lose her legs. She lost her sauce.
          </p>
        </RevealSection>

        <RevealSection>
          <div className="space-y-6 font-accent text-[15px] italic leading-[1.85] text-cream-mid/90">
            <p>
              Her pain was real. But she confused how she used to do things with who she actually was. Her humor. Her depth. Her ability to hold a room. Those were still there. They didn't need a whiteboard. They needed a table.
            </p>
            <p>
              She made a decision many people living with pain make every day: she let the pepper win. Not all at once. Slowly. One concession at a time. One "I can't do it like I used to" at a time. Until the life that remained was all heat and no flavor. Scorching.
            </p>
          </div>
          <p className="mt-6 font-accent text-[12px] italic text-cream-mid/50">
            This story is a de-identified composite drawn from clinical experience. It does not describe any specific individual.
          </p>
        </RevealSection>

        {/* 3. THE TURN */}
        <RevealSection>
          <div className="mt-16 space-y-6 font-body text-[16px] leading-[1.8] text-cream-mid">
            <p>
              Here's what nobody told her, and what nobody may have told you:
            </p>
            <p>
              There is no good time to start. There will always be a reason not to. The pain. The energy. The money. The clothes that don't fit the way they used to. The uncertainty about how it will go. The fear that people will see you struggle. The voice in your own head that says: who are you to be out here laughing when you can barely get through the day?
            </p>
            <p>
              That voice has a name. It's the same voice that taught you to shrink. To dim what was bright in you so that what hurt in you would be believed. It is the voice of every system, every sideways look, every "but you seemed fine yesterday" that trained you to perform suffering instead of living fully.
            </p>
          </div>
        </RevealSection>

        <RevealSection>
          <p className="my-12 text-center font-display text-[clamp(1.2rem,3vw,1.4rem)] font-bold leading-[1.4] text-gold">
            The Pepper Sauce Principle says: enough.
          </p>
        </RevealSection>

        {/* 4. THE CHALLENGE INTRO */}
        <RevealSection>
          <div className="space-y-6 font-body text-[16px] leading-[1.8] text-cream-mid">
            <p>
              We are leveling a challenge. Not a wellness assignment. Not a self-care checklist. A challenge. The kind that requires something of you.
            </p>
          </div>

          <div className="mt-10 text-center">
            <div className="mx-auto mb-6 h-[2px] w-[60px] bg-gold" />
            <h3 className="font-display text-[clamp(1.3rem,3vw,1.5rem)] font-bold text-gold">
              The Pepper Sauce Challenge: Seven Days of Defiant Joy.
            </h3>
          </div>

          <div className="mt-8 space-y-6 font-body text-[16px] leading-[1.8] text-cream-mid">
            <p>
              One act of defiant joy per day for seven days. The same act repeated, or a different one each time. Your recipe, your rules. The only requirement: for seven days, your body gets to feel something besides pain.
            </p>
            <p>
              Need a place to start? Here's what defiant joy has looked like for others:
            </p>
          </div>

          {/* Examples */}
          <div className="mt-6 space-y-0 pl-4">
            {EXAMPLES.map((ex, i) => (
              <p key={i} className="border-l-2 border-gold/40 pl-4 font-accent text-[15px] italic leading-[2.0] text-cream-mid/85">
                {ex}
              </p>
            ))}
          </div>

          <div className="mt-8 space-y-6 font-body text-[16px] leading-[1.8] text-cream-mid">
            <p>
              But the act has rules. These matter.
            </p>
          </div>
        </RevealSection>

        {/* 5. THE RULES */}
        <div className="mt-12 space-y-8">
          <RevealSection>
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
          </RevealSection>

          <RevealSection>
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
          </RevealSection>

          <RevealSection>
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
          </RevealSection>

          <RevealSection>
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
          </RevealSection>
        </div>

        {/* 6. THE REAL DIFFICULTY */}
        <RevealSection>
          <div className="mt-16 space-y-6 font-body text-[16px] leading-[1.8] text-cream-mid">
            <p>
              Let's be honest about what makes this hard. It is not the doing. It is the believing you're allowed to.
            </p>
            <p>
              If you've been living with pain, you have been trained&nbsp;&mdash; by medicine, by culture, by the people closest to you, and eventually by yourself&nbsp;&mdash; to treat joy as conditional. As something earned by healing. As something that has to wait. And when joy did slip through, when you laughed too loud or danced or simply looked like you were having a good day, someone used it against you. "You seemed fine yesterday." "If you can do that, why can't you do this?"
            </p>
            <p>
              So you stopped. Not because the joy wasn't there. Because the cost of showing it was too high.
            </p>
            <p>
              The Pepper Sauce Challenge asks you to pay that cost anyway. On purpose. For seven days. Not because it's easy. Because a life where you've stopped letting yourself feel joy is a life that is slowly going scorching. And you deserve better than scorching.
            </p>
          </div>
        </RevealSection>

        {/* 7. THE INVITATION */}
        <RevealSection>
          <div className="mt-16 space-y-6 font-body text-[16px] leading-[1.8] text-cream-mid">
            <p>
              Day 1 is the hardest. Not because the act is hard. Because Day 1 is where every excuse lives. We know. We've heard them all. We've felt them all.
            </p>
            <p>
              Do it anyway.
            </p>
          </div>
          <div className="mt-6 space-y-6 font-accent text-[16px] italic leading-[1.85] text-cream-mid">
            <p>
              Not because it will fix your pain. The Pepper Sauce Principle will never tell you that. Do it because the pepper was never the whole recipe. Because your sauce has been thinning, and the only person who can add ingredients is you. Because somewhere underneath the exhaustion and the performance and the slow dimming, there is a version of you that is still funny, still warm, still capable of delight. And she has been waiting.
            </p>
          </div>
        </RevealSection>

        <RevealSection>
          <p className="mt-10 text-center font-body text-[17px] leading-[1.7] text-cream">
            Seven days. One joyful act per day. As you are. Where you are. With whatever your body allows today.
          </p>
          <p className="mt-6 text-center font-accent text-[18px] italic text-gold">
            Pain is real. Joy is possible. Prove it to yourself this week.
          </p>
        </RevealSection>

        {/* 8. THAT'S IT */}
        <RevealSection>
          <div className="mt-12 space-y-6 font-body text-[16px] leading-[1.8] text-cream-mid">
            <p>
              That's it. Seven days. You and whatever joy you can get your hands on. You'll be in good company. The blues musicians who held anguish and craft in the same breath did this. The grandmother who stirred scotch bonnet into sauce at a table full of people who knew what the burn tasted like did this. And now you. Tonight.
            </p>
          </div>
        </RevealSection>

        {/* 9. PASS THE SAUCE */}
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

        {/* 10. SUBMISSION FORM */}
        <RevealSection>
          <PassTheSauceForm />
        </RevealSection>

        {/* 11. CTA BUTTON */}
        <RevealSection>
          <div className="mt-12 text-center">
            <a
              href="#challenge"
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
