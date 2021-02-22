/* eslint no-param-reassign: off */
import c from "clsx";
import {promises as fsP} from "fs";
import path from "path";
import React from "react";

import readmoreItems from "../../../data/readmore.json";
import story2 from "../../../data/spotlights/soe-fb-vs-youtube.json";
import story1 from "../../../data/spotlights/soe-map-shutdowns.json";
import Donate from "../../components/donate";
import FigureImg from "../../components/figure-img";
import FigureSvg from "../../components/figure-svg";
import Footnotes from "../../components/footnotes";
import Layout from "../../components/layout";
import NarrativeLink from "../../components/link";
import NarrativeContainer from "../../components/narrative-container-full-feature";
import Readmore from "../../components/readmore";
import ScrollyFeature from "../../components/scrolly-feature";
import Cancel from "../../images/icons/cancel.svg";
import Help from "../../images/icons/help.svg";
import ImgChartF4 from "../../images/spotlights/soe-f4-barchart.png";
import ImgProtest from "../../images/spotlights/soe-myanmar-protest.jpeg";
import imgTableG4 from "../../images/spotlights/soe-table-g4.png";
import ImgTweetFB from "../../images/spotlights/soe-tweet-fb.png";
import ImgWhiteFlags from "../../images/spotlights/soe-white-flags.jpeg";
import {animateSVGviewBox, toggleSVGclass} from "../../scrollama-generic";

// const containerWidth =
//   "w-11/12 md:w-10/12 lg:w-8/12 xl:w-8/12 2xl:w-7/12 px-4 md:px-16 xl:px-28 2xl:px-24";

export const getStaticProps = async () => {
  const svgFbYt = (
    await fsP.readFile(
      path.join(process.cwd(), "public/svg/soe-fb-youtube.svg"),
    )
  ).toString();

  const svgWorldMap = (
    await fsP.readFile(path.join(process.cwd(), "public/svg/soe-worldmap.svg"))
  ).toString();

  return {
    props: {
      svgFbYt,
      svgWorldMap,
    },
  };
};

const hideItem = (query) => {
  const item = document.querySelector(query);
  item.classList.add("fade-out");
  item.classList.remove("fade-in");
  setTimeout(function () {
    item.style.display = "none";
  }, 600);
};

const showItem = (query) => {
  const item = document.querySelector(query);
  item.style.display = "flex";
  setTimeout(function () {
    item.classList.remove("fade-out");
    item.classList.add("fade-in");
  }, 100);
};

const toggleVisibility = (query) => {
  const modal = document.querySelector(query);
  if (modal.style.display !== "none") {
    setTimeout(function () {
      modal.style.display = "none";
    }, 600);
    modal.classList.add("fade-out");
    modal.classList.remove("fade-in");
  } else {
    modal.style.display = "flex";
    setTimeout(function () {
      modal.classList.remove("fade-out");
      modal.classList.add("fade-in");
    }, 100);
  }
};

const footnotes = (
  <>
    <div>
      <p>
        <a href="#ftnt_ref1" id="ftnt1">
          [1]
        </a>{" "}
        Siva Vaidhyanathan, Antisocial Media: How Facebook Disconnects Us and
        Undermines Democracy(New York: Oxford University Press, 2018).
      </p>
    </div>

    <div>
      <p>
        <a href="#ftnt_ref2" id="ftnt2">
          [2]
        </a>{" "}
        See Kendyl Salcito, &ldquo;Company-commissioned HRIA: Concepts,
        Practice, Limitations and Opportunities,&rdquo; in Handbook on Human
        Rights Impact Assessment, ed. Nora G&ouml;tzmann (Northampton, MA:
        Edward Elgar Publishing, 2019), 32&ndash;48.
      </p>
    </div>
    <div>
      <p>
        <a href="#ftnt_ref3" id="ftnt3">
          [3]
        </a>{" "}
        Appeals on Instagram were turned off completely, according to the same
        report. The figures are based on Facebook&rsquo;s disclosed categories
        of enforcement data. Facebook did not explicitly state whether the sum
        of these categories represents all of the enforcement actions it takes
        on its platform.
      </p>
    </div>
    <div>
      <p>
        <a href="#ftnt_ref4" id="ftnt4">
          [4]
        </a>{" "}
        See Lucy Amis and Ashleigh Owens, A Guide for Business: How to Develop a
        Human Rights Policy, 2nd ed. (New York: UN Global Compact and Office of
        the United Nations High Commissioner for Human Rights, 2015), available
        at{" "}
        <NarrativeLink href="https://d306pr3pise04h.cloudfront.net/docs/issues_doc%2Fhuman_rights%2FResources%2FHR_Policy_Guide_2nd_Edition.pdf">
          FHR_Policy_Guide_2nd_Edition.pdf
        </NarrativeLink>
      </p>
    </div>
  </>
);
// CONTENT

const section1 = (
  <section className="max-w-6xl">
    <p>
      The COVID-19 pandemic has brought about a multitude of crises that stretch
      far beyond the realm of public health. In conflict areas like{" "}
      <NarrativeLink href="https://www.hrw.org/news/2020/10/14/war-and-covid-19-yemen">
        Yemen
      </NarrativeLink>
      , the disease compounded already dire circumstances for civilians seeking
      protection from ongoing violence. For students around the world, it laid
      bare the meaning of the{" "}
      <NarrativeLink href="https://www.weforum.org/agenda/2020/04/coronavirus-education-global-covid19-online-digital-learning/">
        digital divide
      </NarrativeLink>
      : those with reliable internet access have been able to keep up with
      schooling, and those without have fallen behind. In the tech sector, while
      profits have soared, the spread of algorithmically-driven{" "}
      <NarrativeLink href="https://secure.avaaz.org/campaign/en/facebook_threat_health/">
        disinformation about the virus
      </NarrativeLink>{" "}
      has brought fatal consequences to people around the world.
    </p>
    <p>
      While the digital platforms we rank were all prepared to{" "}
      <NarrativeLink href="https://www.ft.com/content/dcd96d62-ffe5-414a-a392-018f4208d63a/">
        seize the moment and profit
      </NarrativeLink>{" "}
      from the circumstances created by the pandemic, all the companies were
      caught off guard by the impact of COVID-19 on their own users. Yet they
      have all weathered crises before. Telcos have raced to repair
      infrastructure in the wake of natural disasters. Platforms have grappled
      with government censorship orders in the face of political upheaval.
    </p>
    <blockquote className="pullquote">
      <p>
        The way a company responds to a crisis does not just affect its bottom
        line. It can have profound implications for the fundamental rights of
        millions, if not billions, of people, whether or not they are
        &ldquo;users&rdquo; of a product or service that the company provides.
      </p>
    </blockquote>
    <p>
      The year 2020 could not have given us a better set of case studies in just
      how dangerous it is for these companies to be so unprepared for the human
      impact of crisis.
    </p>
    {/* <blockquote className="pullquote">
      <p>
        Our perpetual state of emergency has exposed the holes in corporate
        policies and practices that can amplify conspiracies, deprive silenced
        voices of remedy, and further exclude the marginalized.
      </p>
    </blockquote> */}
    <p>
      And yet tech juggernauts are expanding their monopolies as custodians of
      user data and gatekeepers of access to content with no more accountability
      than before.
    </p>
    <p>
      In moments of crisis, companies can enable human rights violations, or
      they can try to mitigate them by following cornerstone business and human
      rights practices, like providing remedy to the affected and finding real
      ways to prevent further abuse.
    </p>
    <p>
      How can companies shape their policies and practices so that they are
      prepared&mdash;rather than blindsided&mdash;when the next crisis strikes?
      We looked at a few key examples from the past year to help answer this
      question.
    </p>
  </section>
);

const section2a = (
  <section className="max-w-6xl">
    <h2>No network, no peace</h2>
    <p>
      From{" "}
      <NarrativeLink href="https://globalvoices.org/2020/09/29/azerbaijani-authorities-disrupt-internet-nationwide-amid-nagorno-karabakh-clashes/">
        Azerbaijan
      </NarrativeLink>{" "}
      to{" "}
      <NarrativeLink href="https://www.hrw.org/news/2020/06/19/myanmar-end-worlds-longest-internet-shutdown">
        Myanmar
      </NarrativeLink>{" "}
      to{" "}
      <NarrativeLink href="https://netblocks.org/reports/zimbabwe-internet-disruption-limits-coverage-of-protests-7yNV70yq">
        Zimbabwe
      </NarrativeLink>
      , network shutdowns have become a knee-jerk government response to
      conflict and political upheaval. In 2019 alone, governments around the
      world{" "}
      <NarrativeLink href="https://www.accessnow.org/cms/assets/uploads/2020/02/KeepItOn-2019-report-1.pdf">
        ordered
      </NarrativeLink>{" "}
      approximately 213 network shutdowns, many of them designed to be
      indefinite.
    </p>
  </section>
);

const section2b = (
  <section>
    <p>
      In a network shutdown, the mass violation of freedom of expression is
      typically only the first in a cascade of human rights harms that follow.
      People are rendered unable to communicate with loved ones, obtain vital{" "}
      <NarrativeLink href="https://globalvoices.org/2018/09/07/south-asian-governments-keep-ordering-mobile-shutdowns-and-leaving-users-in-the-dark/">
        news and health information
      </NarrativeLink>
      , or call for help in emergencies, putting their right to life in danger.
      Shutdowns can also{" "}
      <NarrativeLink href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3330413">
        foment violence
      </NarrativeLink>
      , hide evidence of{" "}
      <NarrativeLink href="https://iran-shutdown.amnesty.org/">
        killings
      </NarrativeLink>
      , or even send the disconnected{" "}
      <NarrativeLink href="https://www.premiumtimesng.com/news/145640-borno-residents-want-phone-network-restored-boko-haram-gets-deadlier.html">
        directly into the line of fire
      </NarrativeLink>
      .
    </p>
    <p>
      The 12 telecommunications companies in the RDR Index operate in 125
      countries. In 2020,{" "}
      <NarrativeLink href="https://www.top10vpn.com/cost-of-internet-shutdowns">
        seven
      </NarrativeLink>{" "}
      of these companies were known to have executed government-ordered network
      shutdowns, either directly or through their subsidiaries. Two cases stand
      out: Telenor, a dominant provider in Myanmar, cut off internet access for
      more than a{" "}
      <NarrativeLink href="https://www.hrw.org/news/2020/06/19/myanmar-end-worlds-longest-internet-shutdown">
        million people
      </NarrativeLink>{" "}
      in Myanmar&rsquo;s Rakhine and Chin states, and kept it off at the
      government&rsquo;s behest. In India,{" "}
      <NarrativeLink href="https://news.un.org/en/story/2019/08/1044741">
        millions of residents of Kashmir
      </NarrativeLink>{" "}
      have lived under digital siege since mid-2019, thanks in part to a
      shutdown executed by Bharti Airtel and its peers at the order of the Modi
      government.
    </p>
    <p>
      Marginalized people in both conflict zones have suffered doubly from
      COVID-19 and communication disruptions. But the companies carried these
      orders out in starkly different ways that had measurable impacts for
      customers.
    </p>
    <p>
      In Myanmar, while Telenor complied with government orders, the company
      publicly{" "}
      <NarrativeLink href="https://www.telenor.com/network-restrictions-in-myanmar-1-august-2020/">
        opposed the blackout
      </NarrativeLink>{" "}
      and published{" "}
      <NarrativeLink href="https://www.telenor.com/internet-services-restricted-in-five-townships-in-myanmar-03-february-2020/">
        detailed information
      </NarrativeLink>{" "}
      about the shutdown, identifying the order&rsquo;s legal basis and
      responsible authorities. As the government repeatedly extended the
      blackout, the company continued to release updates. Telenor also injected
      more transparency on shutdowns into its{" "}
      <NarrativeLink href="https://www.telenor.com/wp-content/uploads/2020/08/Telenor-Disclosure-report-2019_08.pdf">
        annual report
      </NarrativeLink>{" "}
      on authority requests and mitigated the risk to lives and livelihoods by
      reducing international call rates, enabling people to more easily make
      calls in the absence of VoIP apps like WhatsApp.
    </p>
  </section>
);

const section2c = (
  <section>
    <p>
      By contrast, India&rsquo;s Bharti Airtel has exercised an apparent policy
      of silence, reporting no information about the order, or data on
      shutdowns. In India, the world&rsquo;s{" "}
      <NarrativeLink href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3330413">
        most frequent purveyor
      </NarrativeLink>{" "}
      of this extreme form of digital repression, such corporate inertia can{" "}
      <NarrativeLink href="http://thebachchaoproject.org/wp-content/uploads/Of_Sieges_and_Shutdowns_The_Bachchao_Project_2018_12_22.pdf">
        trigger hopelessness
      </NarrativeLink>{" "}
      among those who are perpetually disconnected.
    </p>
    <p>
      Telenor&rsquo;s response shows how transparency can form a breakwater
      against network shutdowns. When they receive a shutdown order, we urge
      companies to make this information public. But they must also take a stand
      and create friction. Every excessive order should be met with pushback,
      and{" "}
      <span className="pull-quote">
        companies should alert users about impending blackouts instead of
        abruptly thrusting them into digital darkness.
      </span>
    </p>
  </section>
);

const section3a = (
  <section className="max-w-6xl">
    <h2>Incitement gone viral</h2>
    <p>
      When social media posts inciting political violence go viral, the
      consequences can be fatal. There will always be bad actors on the
      internet. But research has shown that companies&rsquo; algorithmic systems
      can drive the reach of a message by targeting it to people who are most
      likely to share it, influencing the viewpoints of thousands or even
      millions of people.
      <sup>
        <a id="ftnt_ref1" href="#ftnt1">
          [1]
        </a>
      </sup>
    </p>
    <p>
      Facebook itself has{" "}
      <NarrativeLink href="https://www.wsj.com/articles/facebook-knows-it-encourages-division-top-executives-nixed-solutions-11590507499">
        published research
      </NarrativeLink>{" "}
      on its operations in Germany showing that 64 percent of the time, when
      people join an extremist Facebook Group, they do so because the platform
      recommended it.
    </p>
    <p>
      Structured human rights impact assessments are rapidly gaining acceptance
      as a{" "}
      <NarrativeLink href="https://www.humanrights.dk/publications/human-rights-impact-assessment-digital-activities">
        model
      </NarrativeLink>{" "}
      for evaluating the harms that a company may cause or contribute to in
      different contexts. Strong due diligence can help predict, for instance,
      the rise of fringe movements in social media communities or the likelihood
      of coordinated extremist violence moving from online spaces into real
      life. Yet only four companies we ranked appeared to conduct impact
      assessments of their own policy enforcement, where these kinds of threats
      often arise.
    </p>
    <p>
      Companies cannot build resilience to shocks without bridging these gaps,
      and it is virtually certain that more governments will soon make
      conducting due diligence compulsory for companies. We urge companies to
      conduct these assessments before they launch new products or services, or
      enter new markets, to mitigate harms before they happen.
    </p>
    <FigureImg
      img={imgTableG4}
      alt="TODO - Caption | Description"
      caption="Data from Indicator G4b in the 2020 RDR Index"
    />
    <p>
      Companies are erratic and opaque about how they implement their human
      rights commitments in ordinary times, but these things can become even
      murkier in volatile situations, and the consequences are often most severe
      for marginalized communities.{" "}
      <span className="pull-quote">
        When a social media-driven crisis unfolds, companies often fail to
        respond unless they perceive a risk to their reputation.
      </span>{" "}
      This encourages the proliferation of &ldquo;scandal-driven&rdquo; human
      rights due diligence that, at most, helps to survey or contain the damage
      rather than prevent it.
      <sup>
        <a id="ftnt_ref2" href="#ftnt2">
          [2]
        </a>
      </sup>
    </p>
    <p>
      In Sri Lanka in 2018, rampant hate speech on Facebook helped instigate a
      wave of violent attacks, mostly targeting Muslims, who represent a
      minority in the predominantly Buddhist country. Following bitter criticism
      from{" "}
      <NarrativeLink href="https://groundviews.org/2018/04/10/open-letter-to-facebook-implement-your-own-community-standards/">
        civil society
      </NarrativeLink>{" "}
      and coverage by major media including the{" "}
      <NarrativeLink href="https://www.nytimes.com/2018/04/21/world/asia/facebook-sri-lanka-riots.html">
        <em>New York Times</em>
      </NarrativeLink>
      , Facebook commissioned a third-party assessment of its operations in Sri
      Lanka. In May 2020, the company released an abridged version of{" "}
      <NarrativeLink href="https://about.fb.com/news/2020/05/human-rights-work-in-asia/">
        the assessment
      </NarrativeLink>
      , alongside two others it had commissioned two years prior.
    </p>
  </section>
);

const section3b = (
  <section className="max-w-6xl">
    <p>
      While this marked a step in the right direction, the public documentation
      showed little evidence that the assessors had investigated how
      Facebook&rsquo;s ranking and recommendation algorithms helped incite
      communal violence and exacerbate other harms. In its response to two of
      the assessments, Facebook{" "}
      <NarrativeLink href="https://about.fb.com/wp-content/uploads/2020/05/Sri-Lanka-HRIA-Executive-Summary-v82.pdf">
        addressed this issue
      </NarrativeLink>{" "}
      in the most skeletal way, claiming only that certain engagement-driving
      algorithms were &ldquo;now phased out.&rdquo;
    </p>
    <p>
      Companies also need to publicly report how they carry out these actions.
      Here too, the companies in the RDR Index are falling short.
      Facebook&rsquo;s{" "}
      <NarrativeLink href="https://transparency.facebook.com/community-standards-enforcement">
        Community Standards Enforcement Report
      </NarrativeLink>
      , for example, does not include the total volume of restricted content or
      accounts, enforcement by restriction type, or country-specific
      information.
    </p>
    <p>
      Companies must include algorithmic transparency in their reporting as
      well. They should publish rules and policies covering their approach to
      algorithms and targeted advertising as the basis for their transparency
      reporting and corporate due diligence.
    </p>
  </section>
);

const section4 = (
  <section className="max-w-6xl">
    <h2>More algorithms, more appeals</h2>
    <p>
      When it comes to content moderation, companies will always make mistakes.
      Given the scale at which digital platforms operate, there is simply no way
      to protect everyone from the harms that can arise from online content and
      companies&rsquo; censorship decisions. This is why a user&rsquo;s right to
      remedy, or to appeal a company&rsquo;s content decisions, is so important.
    </p>
    <p>
      Losing access to remedy can leave people in a sort of information and
      communication limbo. When accounts are wrongfully suspended, people lose
      what might be their only remote communication tool. On the content side,
      we&rsquo;ve seen companies mistakenly censor everything from vital{" "}
      <NarrativeLink href="https://citizenlab.ca/2020/03/censored-contagion-how-information-on-the-coronavirus-is-managed-on-chinese-social-media/">
        public health information
      </NarrativeLink>
      , to{" "}
      <NarrativeLink href="https://slate.com/technology/2020/10/facebook-instagram-endsars-protests-nigeria.html">
        calls for protest
      </NarrativeLink>
      , to{" "}
      <NarrativeLink href="https://www.hrw.org/news/2020/09/10/social-media-platforms-remove-war-crimes-evidence">
        evidence of war crimes
      </NarrativeLink>
      .
    </p>
    <p>
      When the COVID-19 pandemic struck, Facebook{" "}
      <NarrativeLink href="https://about.fb.com/news/2020/12/coronavirus/">
        sent home
      </NarrativeLink>{" "}
      workers who review millions of posts each day for rule violations. The
      company decided to put its algorithms in charge instead, hoping the
      technology would keep content moderation processes moving. But the
      solution had at least one critical flaw: it was unable to address appeals.
      In an August 2020 press call, Facebook explained that it had{" "}
      <NarrativeLink href="https://about.fb.com/wp-content/uploads/2020/08/Press-Call-Transcript.pdf">
        severely scaled back
      </NarrativeLink>{" "}
      the processing of new appeals sent by disgruntled users, indicating that
      the company&rsquo;s experiments with algorithmic moderation had not worked
      out so well. The system&rsquo;s apparent collapse left millions of users
      unable to appeal moderation decisions at all.&nbsp;
      <sup>
        <a id="ftnt_ref3" href="#ftnt3">
          [3]
        </a>
      </sup>
    </p>
    <FigureImg
      img={ImgTweetFB}
      caption="Embed FB “SORRY YOU CAN’T APPEAL THAT” [<a href='https://twitter.com/timsamoff/status/1265374113901604865/photo/1' target='_blank' rel='noopener noreferrer'>Tweet Link</a>]"
      alt="Embed FB “SORRY YOU CAN’T APPEAL THAT”"
    />

    <p>
      The{" "}
      <NarrativeLink href="https://www.cnet.com/news/youtube-automation-removes-11m-videos-in-3-months/">
        story at YouTube
      </NarrativeLink>{" "}
      was different. Like Facebook, Google (YouTube&rsquo;s parent company) was
      forced to send workers home, also &ldquo;relying more on technology&rdquo;
      to carry out content moderation. Google even offered a statement saying
      that the change might result in the company &ldquo;removing more content
      that may not be violative of our policies.&rdquo; But Google also thought
      ahead and{" "}
      <NarrativeLink href="https://www.protocol.com/youtube-content-moderation-covid-19">
        ramped up its appeals systems
      </NarrativeLink>
      , anticipating that algorithmic content moderation would lead to more
      wrongful removals and more appeals from users. Indeed, appeals{" "}
      <NarrativeLink href="https://transparencyreport.google.com/youtube-policy/appeals">
        doubled
      </NarrativeLink>{" "}
      in the same period. But because the company took measures to prepare, the
      number of videos restored on appeal quadrupled.
    </p>
  </section>
);

const section5 = (
  <section className="max-w-6xl">
    <h2>How can companies prepare for crisis?</h2>
    <p>
      No person or company can anticipate every harm that will arise in an
      emergency. But there is a significant distance between this zone of
      impossibility and the lack of preparedness that many companies exhibited
      in 2020. Our indicators, which draw extensively from international human
      rights doctrine and the expertise of human rights advocates around the
      world, offer a path forward.&nbsp;
    </p>
    <p>
      Whether circumstances are ordinary or extraordinary, companies should
      pursue three objectives (among many others) if they seek to improve.
    </p>
    <h3>1. Publicly commit to human rights</h3>
    <p>
      Companies must make a public commitment to respect human rights standards
      across their operations.
      <sup>
        <a id="ftnt_ref4" href="#ftnt4">
          [4]
        </a>
      </sup>{" "}
      Of course, a policy alone will not improve performance. As our 2020 data
      showed, many companies in the RDR Index committed to human rights in
      principle, but failed to demonstrate these commitments through the
      practices that actually affect users&rsquo; rights. These kinds of
      commitments can serve as a tool for a company to measure and document
      violations, and for advocates to push for better policies at the product
      and service level.
    </p>
    <p>
      Take Apple, which was one of the most improved companies in the 2020
      Index, largely due to a new{" "}
      <NarrativeLink href="https://s2.q4cdn.com/470004039/files/doc_downloads/gov_docs/Apple-Human-Rights-Policy.pdf">
        human rights policy
      </NarrativeLink>{" "}
      that the company published after years of{" "}
      <NarrativeLink href="https://rankingdigitalrights.org/2020/10/09/the-radar-weve-got-our-eyes-on-apple/">
        sustained pressure by RDR
      </NarrativeLink>{" "}
      and others. When Apple delayed the rollout of pro-privacy, anti-tracking
      features in iOS 14, advocates (including RDR) were able to{" "}
      <NarrativeLink href="https://9to5mac.com/2020/11/19/apple-privacy-letter-ios-14-facebook/">
        use the new policy
      </NarrativeLink>{" "}
      to hold the company to account.
    </p>
    <h3>2. Double down on due diligence</h3>
    <p>
      <span className="pull-quote">
        Large multinational companies like the ones in our index can no longer
        plead ignorance.
      </span>{" "}
      They must reinforce their policy commitments by putting human rights at
      the center of their practices, and carrying out robust human rights due
      diligence.&nbsp;
    </p>
    <p>
      Companies that conduct human rights impact assessments should see early
      warning signs when political or social conflict is on the horizon, and
      they can act on this by enhancing scrutiny of online activity, stanching
      the spread of inciting or hateful content, or even notifying authorities,
      where appropriate. When chaos erupts, a company with strong due diligence
      processes in place can quickly identify how its platform may be used to
      cause harm and activate protocols to protect potential victims.
    </p>
    <h3>3. Pull back the curtain and report data</h3>
    <p>
      Companies can and do report some data on their enforcement of their own
      policies, along with compliance with government censorship and
      surveillance demands, in the form of transparency reports.&nbsp;
    </p>
    <p>
      While 16 companies in the RDR Index offer some kind of transparency report
      (and two others have begun doing so since our research cutoff date), none
      of these companies does nearly enough to show users, civil society, or
      policymakers what&rsquo;s really happening behind the curtain.&nbsp;
    </p>
    <FigureImg
      img={ImgChartF4}
      alt="TODO - What information do companies&rsquo; transparency reports include?"
    />
    <p>
      Only five companies in the 2020 RDR Index published data about enforcement
      of their own policies and only six revealed data on government censorship
      demands. Even existing transparency reports suffer from major blind spots.
      Facebook&rsquo;s{" "}
      <NarrativeLink href="https://transparency.facebook.com/community-standards-enforcement">
        Community Standards Enforcement Report
      </NarrativeLink>
      , for example, does not include the total volume of restricted content or
      accounts, enforcement by restriction type, or country-specific
      information.
    </p>
    <p>
      Together, such gaps can deprive users and researchers of the ability to
      map enforcement surges to specific events, especially as companies expand
      their arsenal of enforcement actions. Greater clarity here would brighten
      what remains a grim landscape.
    </p>
  </section>
);

const section6 = (
  <section className="max-w-6xl">
    <h2>Better late than never</h2>
    <p>
      Without preparedness, crises spin out of control. Understaffed hospitals
      and truncated national pandemic response teams fail to harness the
      outbreaks of diseases, security forces{" "}
      <NarrativeLink href="https://www.theatlantic.com/international/archive/2021/01/us-big-tech-capitol-hill/617636/">
        fail to protect
      </NarrativeLink>{" "}
      core institutions overwhelmed by frenzied mobs, and social media companies
      fail to quash online threats of violence before they lead to real-life
      harm.
    </p>
    <p>
      Companies can address these harms by anchoring all of their actions in
      international human rights standards. Companies that build respect for
      human rights into their policies and products from the start will always
      be better prepared to face uncertainty than those that do not.
    </p>
    <p>
      As we continue to grapple with a global crisis that has kindled
      innumerable local fires, companies continue to make ad hoc decisions that
      affect millions. They are late to embrace these standards. But late is
      better than never.
    </p>
  </section>
);

/* helper functions */

// MAIN

const SpotlightOne = ({svgFbYt, svgWorldMap}) => {
  // const [currentStep, setCurrentStep] = useState();
  // const [ioHook2] = useInView({
  //   threshold: [0.6],
  //   triggerOnce: true,
  // });
  const readmore = ["key-findings", "services", "unaccountable-algorithms"].map(
    (kind) => {
      const item = readmoreItems.find((i) => i.kind === kind);
      return (
        item || {
          id: "empty",
          url: "#",
          title: "MISSING",
          excerpt: "MISSING",
        }
      );
    },
  );

  return (
    <Layout>
      <main className="spotlight">
        <>
          <NarrativeContainer
            hasHero
            heroClassName="hero-full hero-state-of-emergency"
            heroCaption="People queue for milk during the pandemic in Kashmir. Photo by Abid Bhat, used with permission."
            backgroundClassName="bg-rdr bg-opacity-20"
            transparent
          >
            <div className="mb-6 border-b border-prissian mt-3 md:mt-12 pb-4">
              <h1 className="flex flex-col md:flex-row md:items-start font-platform bold text-xl leading-none">
                <p>
                  Context before code: Protecting human rights in a state of
                  emergency
                </p>
              </h1>
              <span className="font-platform text-sm">
                By Elizabeth M. Renieris & Jan Rydzak
              </span>
            </div>
            {section1}
            {section2a}
          </NarrativeContainer>
          <div className="m-auto bg-rdr bg-opacity-20">
            <FigureImg
              img={ImgProtest}
              extraClass="spot-figure"
              caption="Demonstrators protest a network shutdown in Myanmar. Photo by <a href='https://twitter.com/lwin051965' target='_blank' rel='noopener noreferrer'>Nyinyi Lwin</a>, used with permission."
              alt="TODO - Demonstrators protest a network shutdown in Myanmar. Photo by Nyinyi Lwin, used with permission."
            />
          </div>
          <NarrativeContainer
            backgroundClassName="bg-rdr bg-opacity-20"
            transparent
          >
            {section2b}
          </NarrativeContainer>
          <ScrollyFeature
            id="scrolly-map"
            story={story1}
            stepEnter={({index, element, direction}) => {
              if (element.dataset.show || element.dataset.hide) {
                toggleSVGclass({
                  objId: "map-world",
                  showLayers: element.dataset.show,
                  hideLayers: element.dataset.hide,
                  direction,
                });
              }
              if (index === 2) {
                animateSVGviewBox("#map-world svg", "#Full-Map", "resetView");
              }
              if (index === 2 && direction === "down") {
                animateSVGviewBox(
                  "#map-world svg",
                  "#Shutdowns-View",
                  "zoom-shutdowns",
                );
              }
              if (index === 3 && direction === "down") {
                animateSVGviewBox("#map-world svg", "#Asia-View", "zoom-asia");
              }
              if (index === story1.steps.length - 1 && direction === "down") {
                animateSVGviewBox(
                  "#map-world svg",
                  "#Shutdowns-View",
                  "zoom-shutdowns",
                );
              }
            }}
            // stepExit={({index, direction}) => {
            //   console.log(`Local Exit 1: ${index} - ${direction}`); // TODO
            // }}
          >
            <figure className="scrolly-figure bg-light-grey">
              <FigureSvg
                className="scrolly-figure bg-light-grey"
                svg={svgWorldMap}
                alt="TODO: Alternative description"
                id="map-world"
              />
            </figure>
          </ScrollyFeature>
          <NarrativeContainer
            backgroundClassName="bg-rdr bg-opacity-20"
            transparent
          >
            {section2c}
            {section3a}
          </NarrativeContainer>
          <div className="m-auto bg-rdr bg-opacity-20">
            <FigureImg
              img={ImgWhiteFlags}
              extraClass="spot-figure"
              caption="Mourners hang white flags in Sri Lanka, following the 2019 bombings of churches around the country. Photo by Groundviews (CC BY-ND 3.0)"
              alt="Mourners hang white flags in Sri Lanka, following the 2019 bombings of churches around the country. Photo by Groundviews (CC BY-ND 3.0)"
            />
          </div>
          <NarrativeContainer
            backgroundClassName="bg-rdr bg-opacity-20"
            transparent
          >
            {section3b}
            {section4}
          </NarrativeContainer>
          <ScrollyFeature
            id="scrolly-graph"
            story={story2}
            stepEnter={({index, element, direction}) => {
              if (element.dataset.show || element.dataset.hide) {
                toggleSVGclass({
                  objId: "chart-q1",
                  showLayers: element.dataset.show,
                  hideLayers: element.dataset.hide,
                  direction,
                });
              }

              if (index === 0) {
                hideItem("#fb-infobox");
                hideItem("#fb-info");
              }
              if (index === 1) {
                showItem("#fb-infobox");
              }

              if (index >= 2) {
                hideItem("#fb-infobox");
                showItem("#fb-info");
              }
            }}
            // stepExit={({index, direction}) => {
            //   console.log(`Local Exit: ${index} - ${direction}`);
            // }}
          >
            <figure className="scrolly-figure bg-light-grey p-4">
              <button
                id="fb-info"
                className="btn-info fade-out focus:outline-none z-20"
                style={{display: "none"}}
                onClick={() => toggleVisibility("#modal-fb")}
              >
                <Help className="w-5 h-5 ml-3" />
              </button>
              <div
                className="modal relative fade-out z-10 w-full h-full items-center justify-center"
                style={{display: "none"}}
                id="modal-fb"
              >
                <div className="relative max-w-screen-md overflow-auto bg-light-grey">
                  <button
                    className="absolute mt-6 right-4"
                    tabIndex={0}
                    onClick={() => toggleVisibility("#modal-fb")}
                  >
                    <span>
                      <Cancel
                        className="w-3 h-3 text-black fill-current"
                        aria-label="Close modal"
                      />
                    </span>
                  </button>
                  <p className="p-8 bg-white m-auto h-auto content-center">
                    Content appealed and restored on appeal on Facebook vs.
                    videos appealed and restored on YouTube between October 2019
                    and September 2020. Data for Facebook does not include the
                    &ldquo;Fake Accounts&rdquo; category, for which appeals are
                    not reported. Sources:{" "}
                    <NarrativeLink href="https://transparency.facebook.com/community-standards-enforcement">
                      Community Standards Enforcement Report (Facebook)
                    </NarrativeLink>{" "}
                    and{" "}
                    <NarrativeLink href="https://transparencyreport.google.com/youtube-policy/appeals">
                      {" "}
                      Google Transparency Report (YouTube)
                    </NarrativeLink>
                    .
                  </p>
                </div>
              </div>
              <div
                id="fb-infobox"
                className="flex-col w-3/4 max-w-screen-md	hidden h-screen m-auto text-center justify-center items-center"
              >
                <div className="bg-white shadow-xl px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h2>Background</h2>
                  <p>
                    When COVID - 19 hit, both Facebook and Google (YouTube’ s
                    parent company) sent their content moderators home, and
                    deployed algorithms more extensively to review content.
                  </p>
                  <p>Facebook almost completely shut off its appeals option.</p>
                  <p>
                    YouTube kept it enabled, and put extra resources into
                    reviewing appeals and restoring content.
                  </p>
                </div>
              </div>
              <FigureSvg
                className="scrolly-figure bg-light-grey p-4"
                svg={svgFbYt}
                alt="TODO: Alternative description"
                id="chart-q1"
              />
            </figure>
          </ScrollyFeature>
          <NarrativeContainer
            backgroundClassName="bg-rdr bg-opacity-20"
            transparent
          >
            {section5}
            {section6}
            <Footnotes source={footnotes} />
            <Donate className={c("relative mx-auto mt-12 mb-8")} />
          </NarrativeContainer>
          <div className="bg-beige flex py-3 md:py-12">
            <div
              className={c(
                "narrative-container relative flex flex-col mx-3 md:mx-auto lg:flex-row items-center",
                "md:w-10/12 lg:w-8/12 xl:w-8/12 2xl:w-7/12",
              )}
            >
              <Readmore className="w-full lg:max-w-xs" readmore={readmore[0]} />
              <Readmore
                className="w-full my-6 lg:my-0 lg:max-w-xs lg:mx-6"
                readmore={readmore[1]}
              />
              <Readmore className="w-full lg:max-w-xs" readmore={readmore[2]} />
            </div>
          </div>
        </>
      </main>
    </Layout>
  );
};

export default SpotlightOne;
