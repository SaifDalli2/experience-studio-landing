/* ============================================================
   JOURNAL — single source of truth for articles (English).
   Rendered as the list on index.html and as the article on
   article.html (?id=...). Body is an array of typed blocks:
   {t:'p'|'h2'|'quote'|'ul'|'btn', x:"..."} ('ul' uses items:[],
   'btn' uses href:"...").
   ============================================================ */
window.JOURNAL = [
  {
    id:'coverage-router-ksa',
    tag:'Case study',
    date:'June 2026',
    read:'7 min read',
    title:'Who pays for this patient?',
    dek:'In the Kingdom, a single patient’s bill can fall to any of a dozen parties — and no published rule decides which. This is the story of that gap, and how we tried to close it.',
    body:[
      {t:'p', x:"Picture a man carried into an emergency room after a car crash. He is an employee with cooperative health insurance; the accident happened on his way to work; and the car that hit him is insured against third parties. Three parties could be liable for his bill at once — his private insurer, the General Organization for Social Insurance (which treats a commuting injury as a “work injury”), and the at-fault driver’s motor insurer. So who pays? In practice, the front desk bills whichever party is nearest to hand, and a quiet dispute between insurers begins that can drag on for months — long after the patient has gone home, or hasn’t."},
      {t:'p', x:"This is not an edge case. In Saudi Arabia, responsibility for health coverage is spread across a web of bodies: CCHI, the Ministry of Health, NPHIES, GOSI, compulsory motor insurance via Najm, military and National Guard health, visitor policies. Which one pays depends not on the patient alone, but on the type of case, the beneficiary’s class, and how the injury occurred."},
      {t:'h2', x:"A question with no official answer"},
      {t:'p', x:"When we began, we expected to find a rule that ordered the insurers — what the world calls Coordination of Benefits. There wasn’t one. The finding that shaped the whole project was startling in its plainness: Saudi Arabia publishes no general Coordination of Benefits cascade for cooperative health insurance. CCHI, NPHIES, and the Insurance Authority all assume a single source of coverage per beneficiary. There is no American-style “birthday rule,” and not even a field in NPHIES to rank insurers first and second."},
      {t:'quote', x:"“This policy will not cover claims resulting from … any illness or injury arising directly from the profession of the Insured.” — the Essential Benefits Policy thus pushes a work injury out of the private insurer’s hands, without saying whose hands it falls into."},
      {t:'p', x:"The one published thing that resembles a rule, we found in the Visitor Insurance Policy, Article 6: the insurer must pay first, then recover from any other plan covering the same expense — a “pay-and-subrogate” model. Its cousin sits in the Ministry of Health’s Annex 66, where the State completes an insured Saudi’s treatment at its own expense once the policy ceiling is exhausted or the service is excluded. That, narrow as it is, is the closest Saudi regulation comes to a cascade."},
      {t:'h2', x:"How we researched it"},
      {t:'p', x:"This was not casual browsing. We gathered the primary sources — CCHI’s policies, the Social Insurance Law (Royal Decree M/273), the Health Law (M/11), the Annex 66 emergency rules, the Unified Motor Insurance Policy — and extracted their text verbatim, so that every verdict could be tied to its source. It was not without friction: some government PDFs resist machine reading, and their Arabic sometimes emerges reversed; we re-extracted with different tools until it read true."},
      {t:'p', x:"More importantly, the research corrected itself. The first pass attributed the “notify within 24 hours” obligation to a CCHI circular; the second pass found its true source in Article 3 of the Ministry’s Annex 66 — and that the notice goes to a ministry-appointed claims company, not to the patient’s insurer. Such corrections are not trivia. They are the difference between a system that is confidently wrong and one that knows where every verdict came from."},
      {t:'quote', x:"“The private hospital is obliged to receive the case and provide emergency treatment … until the case stabilises, regardless of nationality or employer, and without prior financial demand.” — Annex 66, Article 1."},
      {t:'h2', x:"Five families of rules"},
      {t:'p', x:"What the regulator never published in one document, we had to compose from many. We arrived at five families of rules, applied in order, the first to produce a verdict winning:"},
      {t:'ul', items:[
        "Statutory carve-outs — a work injury routes to GOSI Occupational Hazards; a road-traffic injury to the at-fault driver’s motor insurer via a Najm report.",
        "The emergency override — a rule that sits above the rest at the moment of arrival: treat first, settle later.",
        "Facility-driven routing — closed systems, like military and National Guard health, that bill within their own walls.",
        "Beneficiary-class assignment — the anti-duplication rule: one employer-of-record per beneficiary.",
        "Default to private cover — and failing that, the uninsured emergency cascade."
      ]},
      {t:'p', x:"Each family became a service in its own right, a citation behind every verdict. We then poured the logic into a decision engine: versioned JSON trees with effective dates — so a change in the law does not silently rewrite last year’s answers — exposed through an API that speaks FHIR R4 and records every decision in a PDPL-aligned audit log."},
      {t:'h2', x:"When the system goes silent"},
      {t:'p', x:"The hard part is not the clear cases, but those where the sources conflict or fall silent. There we chose discipline over bravado: when the evidence runs out, the engine refuses to guess and refers the case to a human, rather than invent a cascade no one published. And we built a library of twenty-five worked patient scenarios that run as golden tests, catching any change that moves a verdict it should not."},
      {t:'quote', x:"The measure of the system is not only the answers it gives, but the cases where it has the discipline to say: this one needs a human."},
      {t:'h2', x:"Try it yourself"},
      {t:'p', x:"Theory is one thing; running it is another. You can open the simulator in your browser, load any of the twenty-five scenarios, and watch the five rule families resolve in front of you — verdict and source together. From a question the Kingdom never answered in a single document, to an engine you can run and audit yourself."},
      {t:'btn', x:"Open the simulator →", href:"https://saifdalli2.github.io/coverage-router-ksa-public/simulator.html"}
    ]
  },
  {
    id:'die-at-handoff',
    tag:'Point of view',
    date:'June 2026',
    read:'4 min read',
    img:'journal/die-at-handoff.jpeg',
    title:'Why experiences die at the hand-off',
    dek:'Most experience work is buried the day the slide deck is delivered. The fix isn’t a better deck — it’s never handing off.',
    body:[
      {t:'p', x:"In the Kingdom and beyond, the pattern repeats. A consultancy runs a discovery, produces a polished journey map and a service blueprint, presents a roadmap “ready for further development,” and leaves. Months later, the experience that looked inevitable on the wall has never reached a single customer. The deck was excellent. Nothing shipped."},
      {t:'h2', x:"The missing middle"},
      {t:'p', x:"The market is split in two. On one side, strategy and design firms that think beautifully and hand off before a single line of code. On the other, build shops and system integrators that ship software but never owned the customer’s need. Between them lies the gap where most of the value leaks away: the translation of a validated idea into a running, operated service."},
      {t:'quote', x:"An experience isn’t a screen, and it isn’t a slide. It is the whole staged path — from a need to the system that quietly serves it."},
      {t:'p', x:"This gap is not a coordination problem you can solve with more meetings. It is structural. The people who understood the need are gone by the time engineering asks the questions that matter. Context evaporates, decisions get re-litigated, and the blueprint — so confident on paper — meets a thousand small realities it never accounted for."},
      {t:'h2', x:"Designed to run"},
      {t:'p', x:"We work differently. The same team that frames the need designs the service, models the system, writes the API contracts, and wires the automation — one continuous line from discovery to operation. Service blueprinting (Shostack, 1984) meets domain-driven design (Evans) meets orchestration that closes the loop. Nothing is thrown over the wall, because there is no wall."},
      {t:'p', x:"The test of an experience is not whether it presents well. It is whether it runs — reliably, at scale, in Arabic, in the Kingdom — long after the engagement ends. We don’t hand off. We ship."}
    ]
  },
  {
    id:'the-continuum',
    tag:'Method',
    date:'June 2026',
    read:'5 min read',
    img:'journal/the-continuum.jpeg',
    title:'The continuum: from need to a system that serves itself',
    dek:'Five stages, one unbroken line. How an unmet job becomes a service that runs — and what the literature gets right at each step.',
    body:[
      {t:'p', x:"We describe our work as a continuum because the word is literal: an unbroken line from a customer’s first, half-formed need to a system that serves it without us in the room. Each stage rests on a body of practice older than any one studio. Here is the line — and what holds it up."},
      {t:'h2', x:"01 — The need"},
      {t:'p', x:"Before a solution, a job. The discipline of Jobs-to-be-Done (Christensen; Ulwick) insists that customers don’t want products; they hire them to make progress. We frame the unmet job in writing, validate it, and refuse to propose anything until the need is testable."},
      {t:'h2', x:"02 — The solution & the catalog"},
      {t:'p', x:"We diverge to explore and converge to commit — the Double Diamond — then break the chosen solution into named, reusable services. Service blueprinting (Shostack, 1984) maps the front stage, the back stage, and the line of visibility, so everyone can see how the promise is actually kept."},
      {t:'h2', x:"03 — The system"},
      {t:'p', x:"A service is only as durable as its architecture. Domain-driven design (Evans) gives us bounded contexts; API-first contracts make the seams explicit; and Conway’s Law reminds us that the system will mirror the teams that build it — so we shape both together."},
      {t:'h2', x:"04 — Automation, and the loop"},
      {t:'p', x:"The experience has to run when no one is watching. Orchestration, the Saga pattern for consistency across services, and closed-loop feedback turn a launched product into an operating service that heals and improves itself."},
      {t:'quote', x:"The test of a design is not the day it launches. It is the thousandth day it runs."},
      {t:'p', x:"One line, discovery to operation, drawn with intent. That is the whole of it."}
    ]
  }
];
