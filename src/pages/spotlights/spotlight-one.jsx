/* eslint no-param-reassign: off */
import {promises as fsP} from "fs";
import path from "path";
import React from "react";
import {useInView} from "react-intersection-observer";

import story1 from "../../../data/spotlights/spotlight-1.json";
import story2 from "../../../data/spotlights/spotlight-2.json";
import FigureSvg from "../../components/figure-svg";
import Layout from "../../components/layout-spotlights";
import ScrollyFeature from "../../components/scrolly-feature";
import DummyPNG from "../../images/spotlights/datawrapper-map-dummy.png";
// import SpotlightChart from "../../components/spotlight-chart";
// import ChartG4 from "../../images/spotlights/soe-table-g4.png";
import ImgProtest from "../../images/spotlights/soe-myanmar-protest.jpeg";
import {toggleSVGclass} from "../../spotlights-one";

// TODO: refactor into spotlight-components

const toggleFade = (inView) => {
  return inView ? "fade-in" : "fade-out";
};

// const ExternalLink = ({href, text}) => {
//   return (
//     <a href={href} target="_blank">
//       {text}
//     </a>
//   );
// };

// const updateSVGattr = ({objId, query, attr, value}) => {
//   const Obj = document.querySelector(`#${objId}`).contentDocument;
//   [...Obj.querySelectorAll(query)].map((item) =>
//     item.setAttribute(attr, value),
//   );
// };

const HeroImg = ({heroClass = "bg-context-over-code"}) => {
  return <div className={`hero ${heroClass}`} />;
};

const FigureImg = ({img, id, alt, caption}) => {
  const [ioHook, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });
  return (
    <figure
      id={id}
      ref={ioHook}
      className={`spot-figure ${toggleFade(inView)}`}
    >
      <img src={img} alt={alt} />
      <figcaption
        dangerouslySetInnerHTML={{
          __html: caption,
        }}
      />
    </figure>
  );
};

const para1 = (
  <section className="max-w-6xl">
    <p>
      The COVID-19 pandemic has brought about a multitude of crises that stretch
      far beyond the realm of public health. In conflict areas like{" "}
      <a href="https://www.hrw.org/news/2020/10/14/war-and-covid-19-yemen">
        Yemen
      </a>
      , the disease compounded already dire circumstances for civilians seeking
      protection from ongoing violence. For students around the world, it laid
      bare the meaning of the{" "}
      <a href="https://www.weforum.org/agenda/2020/04/coronavirus-education-global-covid19-online-digital-learning/">
        digital divide
      </a>
      : those with reliable internet access have been able to keep up with
      schooling, and those without have fallen behind. In the tech sector, while
      profits have soared, the spread of algorithmically-driven{" "}
      <a href="https://secure.avaaz.org/campaign/en/facebook_threat_health/">
        disinformation about the virus
      </a>{" "}
      has brought fatal consequences to people around the world.
    </p>
    <p>
      The companies we rank were caught off guard by COVID-19, yet they all have
      weathered crises before. Telcos have raced to repair infrastructure in the
      wake of natural disasters. Digital platforms have grappled with government
      censorship orders in the face of political upheaval.
    </p>
    <blockquote>
      The way a company responds to a crisis does not just affect its bottom
      line. It can have profound implications for the fundamental rights of
      millions, if not billions, of people, whether or not they are
      &ldquo;users&rdquo; of a product or service that the company provides.
    </blockquote>
    <p>
      The year 2020 could not have given us a better set of case studies in just
      how dangerous it is for these companies to be so unprepared for crisis.
      Our perpetual state of emergency has exposed the holes in corporate
      policies and practices that can amplify conspiracies, deprive silenced
      voices of remedy, and further exclude the marginalized. And yet tech
      juggernauts are expanding their monopolies as custodians of user data and
      gatekeepers of access to content with no more accountability than before.
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

const para2 = (
  <section className="max-w-6xl">
    <h2 className="sticky-h">
      No network,
      <br />
      no peace
    </h2>
    <p>
      From{" "}
      <a href="https://globalvoices.org/2020/09/29/azerbaijani-authorities-disrupt-internet-nationwide-amid-nagorno-karabakh-clashes/">
        Azerbaijan
      </a>{" "}
      to{" "}
      <a href="https://www.hrw.org/news/2020/06/19/myanmar-end-worlds-longest-internet-shutdown">
        Myanmar
      </a>{" "}
      to{" "}
      <a href="https://netblocks.org/reports/zimbabwe-internet-disruption-limits-coverage-of-protests-7yNV70yq">
        Zimbabwe
      </a>{" "}
      , network shutdowns have become a knee-jerk government response to
      conflict and political upheaval. In 2019 alone, governments around the
      world{" "}
      <a href="https://www.accessnow.org/cms/assets/uploads/2020/02/KeepItOn-2019-report-1.pdf">
        ordered
      </a>{" "}
      approximately 213 network shutdowns, many of them designed to be
      indefinite.
    </p>
    <p>
      In a network shutdown, the mass violation of freedom of expression is
      typically only the first in a cascade of human rights harms that follow.
      People are rendered unable to communicate with loved ones, obtain vital{" "}
      <a href="https://globalvoices.org/2018/09/07/south-asian-governments-keep-ordering-mobile-shutdowns-and-leaving-users-in-the-dark/">
        news and health information
      </a>{" "}
      , or call for help in emergencies, putting their right to life in danger.
      Shutdowns can also{" "}
      <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3330413">
        foment violence
      </a>{" "}
      , hide evidence of{" "}
      <a href="https://iran-shutdown.amnesty.org/">killings</a> , or even send
      the disconnected{" "}
      <a href="https://www.premiumtimesng.com/news/145640-borno-residents-want-phone-network-restored-boko-haram-gets-deadlier.html">
        directly into the line of fire
      </a>
      .
    </p>
    <FigureImg
      img={ImgProtest}
      caption="Demonstrators protest a network shutdown in Myanmar. Photo by <a href='https://twitter.com/lwin051965' target='_blank'>Nyinyi Lwin</a>, used with permission."
      alt="TODO - Demonstrators protest a network shutdown in Myanmar. Photo by Nyinyi Lwin, used with permission."
    />
    <p>
      The 12 telecommunications companies in the RDR Index operate in 125
      countries. In 2020,{" "}
      <a href="https://www.top10vpn.com/cost-of-internet-shutdowns">seven</a> of
      these companies were known to have executed government-ordered network
      shutdowns, either directly or through their subsidiaries. Two cases stand
      out: Telenor, a dominant provider in Myanmar, cut off internet access for
      more than a{" "}
      <a href="https://www.hrw.org/news/2020/06/19/myanmar-end-worlds-longest-internet-shutdown">
        million people
      </a>{" "}
      in Myanmar&rsquo;s Rakhine and Chin states, and kept it off at the
      government&rsquo;s behest. In India,{" "}
      <a href="https://news.un.org/en/story/2019/08/1044741">
        millions of residents of Kashmir
      </a>{" "}
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
      <a href="https://www.telenor.com/network-restrictions-in-myanmar-1-august-2020/">
        opposed the blackout
      </a>{" "}
      and published{" "}
      <a href="https://www.telenor.com/internet-services-restricted-in-five-townships-in-myanmar-03-february-2020/">
        detailed information
      </a>{" "}
      about the shutdown, identifying the order&rsquo;s legal basis and
      responsible authorities. As the government repeatedly extended the
      blackout, the company continued to release updates. Telenor also injected
      more transparency on shutdowns into its{" "}
      <a href="https://www.telenor.com/wp-content/uploads/2020/08/Telenor-Disclosure-report-2019_08.pdf">
        annual report
      </a>{" "}
      on authority requests and mitigated the risk to lives and livelihoods by
      reducing international call rates, enabling people to more easily make
      calls in the absence of VoIP apps like WhatsApp.
    </p>
  </section>
);

const para3 = (
  <section className="max-w-6xl">
    <p>
      By contrast, India&rsquo;s Bharti Airtel has exercised an apparent policy
      of silence, reporting no information about the order, or data on
      shutdowns. In India, the world&rsquo;s{" "}
      <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3330413">
        most frequent purveyor
      </a>{" "}
      of this extreme form of digital repression, such corporate inertia can{" "}
      <a href="http://thebachchaoproject.org/wp-content/uploads/Of_Sieges_and_Shutdowns_The_Bachchao_Project_2018_12_22.pdf">
        trigger hopelessness
      </a>{" "}
      among those who are perpetually disconnected.
    </p>
    <p>
      Telenor&rsquo;s response shows how transparency can form a breakwater
      against network shutdowns. When they receive a shutdown order, we urge
      companies to make this information public. But they must also take a stand
      and create friction. Every excessive order should be met with pushback,
      and companies should alert users about impending blackouts instead of
      abruptly thrusting them into digital darkness.
    </p>
  </section>
);

const para4 = (
  <section className="max-w-6xl">
    <h2 className="sticky-h">Incitement gone viral</h2>
    <p>
      When social media posts inciting political violence go viral, the
      consequences can be fatal. There will always be bad actors on the
      internet. But research has shown that companies&rsquo; algorithmic systems
      can drive the reach of a message by targeting it to people who are most
      likely to share it, influencing the viewpoints of thousands or even
      millions of people.
    </p>
    <p>
      Facebook itself has{" "}
      <a href="https://www.wsj.com/articles/facebook-knows-it-encourages-division-top-executives-nixed-solutions-11590507499">
        published research
      </a>{" "}
      on its operations in Germany showing that 64 percent of the time, when
      people join an extremist Facebook Group, they do so because the platform
      recommended it.
    </p>
    <p>
      Structured human rights impact assessments are rapidly gaining acceptance
      as a{" "}
      <a href="https://www.humanrights.dk/publications/human-rights-impact-assessment-digital-activities">
        model
      </a>{" "}
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
    <p>
      Companies are erratic and opaque about how they implement their human
      rights commitments in ordinary times, but these things can become even
      murkier in volatile situations, and the consequences are often most severe
      for marginalized communities. When a social media-driven crisis unfolds,
      companies often fail to respond unless they perceive a risk to their
      reputation. This encourages the proliferation of
      &ldquo;scandal-driven&rdquo; human rights due diligence that, at most,
      helps to survey or contain the damage rather than prevent it.
    </p>
    <p>
      In Sri Lanka in 2018, rampant hate speech on Facebook helped instigate a
      wave of violent attacks, mostly targeting Muslims, who represent a
      minority in the predominantly Buddhist country. Following bitter criticism
      from{" "}
      <a href="https://groundviews.org/2018/04/10/open-letter-to-facebook-implement-your-own-community-standards/">
        civil society
      </a>{" "}
      and coverage by major media including the{" "}
      <a href="https://www.nytimes.com/2018/04/21/world/asia/facebook-sri-lanka-riots.html">
        <em>New York Times</em>
      </a>
      , Facebook commissioned a third-party assessment of its operations in Sri
      Lanka. In May 2020, the company released an abridged version of{" "}
      <a href="https://about.fb.com/news/2020/05/human-rights-work-in-asia/">
        the assessment
      </a>
      , alongside two others it had commissioned two years prior.
    </p>
    <p>
      While this marked a step in the right direction, the public documentation
      showed little evidence that the assessors had investigated how
      Facebook&rsquo;s ranking and recommendation algorithms helped incite
      communal violence and exacerbate other harms. In its response to two of
      the assessments, Facebook{" "}
      <a href="https://about.fb.com/wp-content/uploads/2020/05/Sri-Lanka-HRIA-Executive-Summary-v82.pdf">
        addressed this issue
      </a>{" "}
      in the most skeletal way, claiming only that certain engagement-driving
      algorithms were &ldquo;now phased out.&rdquo;
    </p>
    <p>
      Companies also need to publicly report how they carry out these actions.
      Here too, the companies in the RDR Index are falling short.
      Facebook&rsquo;s{" "}
      <a href="https://transparency.facebook.com/community-standards-enforcement">
        Community Standards Enforcement Report
      </a>
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
    <h2 className="sticky-h">More algorithms, more appeals</h2>
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
      <a href="https://citizenlab.ca/2020/03/censored-contagion-how-information-on-the-coronavirus-is-managed-on-chinese-social-media/">
        public health information
      </a>
      , to{" "}
      <a href="https://slate.com/technology/2020/10/facebook-instagram-endsars-protests-nigeria.html">
        calls for protest
      </a>
      , to{" "}
      <a href="https://www.hrw.org/news/2020/09/10/social-media-platforms-remove-war-crimes-evidence">
        evidence of war crimes
      </a>
      .
    </p>
    <p>
      When the COVID-19 pandemic struck, Facebook sent home workers who review
      millions of posts each day for rule violations. The company decided to put
      its algorithms in charge instead, hoping the technology would keep content
      moderation processes moving. But the solution had at least one critical
      flaw: it was unable to address appeals. In an August 2020 press call,
      Facebook explained that it had{" "}
      <a href="https://about.fb.com/wp-content/uploads/2020/08/Press-Call-Transcript.pdf">
        severely scaled back
      </a>{" "}
      the processing of new appeals sent by disgruntled users, indicating that
      the company&rsquo;s experiments with algorithmic moderation had not worked
      out so well. The system&rsquo;s apparent collapse left millions of users
      unable to appeal moderation decisions at all.&nbsp;
    </p>
  </section>
);

const lorem = (
  <section className="max-w-6xl">
    <h2 className="sticky-h">Lorem Ipsum 1</h2>
    <p>
      Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast
      yardarm. Pinnace holystone mizzenmast quarter crows nest nipperkin grog
      yardarm hempen halter furl. Swab barque interloper chantey doubloon
      starboard grog black jack gangway rutters.
    </p>

    <p>
      Deadlights jack lad schooner scallywag dance the hempen jig carouser
      broadside cable strike colors. Bring a spring upon her cable holystone
      blow the man down spanker Shiver me timbers to go on account lookout
      wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm
      spyglass sheet transom heave to.
    </p>

    <p>
      Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway. Case
      shot Shiver me timbers gangplank crack Jennys tea cup ballast Blimey lee
      snow crows nest rutters. Fluke jib scourge of the seven seas boatswain
      schooner gaff booty Jack Tar transom spirits.
    </p>
  </section>
);

const InnerCounter = (
  <div>
    <p id="scene-counter">Off</p>
    <p id="index-counter">Off</p>
  </div>
);

export const getStaticProps = async () => {
  const svg1 = (
    await fsP.readFile(path.join(process.cwd(), "public/svg/asia.svg"))
  ).toString();

  const svg2 = (
    await fsP.readFile(
      path.join(process.cwd(), "public/svg/soe-fb-youtube-2.svg"),
    )
  ).toString();

  const svg3 = (
    await fsP.readFile(path.join(process.cwd(), "public/svg/soe-worldmap.svg"))
  ).toString();

  const svg4 = (
    await fsP.readFile(path.join(process.cwd(), "public/svg/matrix-mock.svg"))
  ).toString();

  return {
    props: {
      svg1,
      svg2,
      svg3,
      svg4,
    },
  };
};

const SpotlightOne = ({svg1, svg2, svg3, svg4}) => {
  // const [currentStep, setCurrentStep] = useState();
  const [ioHook2] = useInView({
    threshold: [0.5],
    triggerOnce: false,
  });

  return (
    <Layout>
      <main className="container mx-auto spotlight">
        {/* <HeroImage /> */}
        {/* <FigureImg
          img={HeroImage}
          // caption="Caption: Example PNG Image"
          alt="TODO - Caption: Example PNG Image"
          // id="map-dw-1"
        /> */}
        <HeroImg />
        <h1>
          Context before code: Protecting human rights in a state of emergency
        </h1>
        {/* // TODO */}
        {para1}
        {para2}
        <ScrollyFeature
          id="scrolly-map"
          ref={ioHook2}
          story={story1}
          stepEnter={({element}) => {
            if (element.dataset.queries) {
              toggleSVGclass({
                objId: "map-asia-1",
                query: element.dataset.queries,
                toggleClassName: element.dataset.toggle,
              });
            }
          }}
          stepExit={({index, direction}) => {
            console.log(`Local Exit 1: ${index} - ${direction}`);
          }}
        >
          <figure className="scrolly-figure bg-gray-200">
            <FigureSvg
              className="scrolly-figure bg-gray-200"
              svg={svg1}
              caption="Caption As Props 1"
              alt="TODO: Alternative description"
              id="map-asia-1"
            />
            {InnerCounter}
          </figure>
        </ScrollyFeature>
        {para3}
        <FigureSvg
          className="bg-gray-200"
          svg={svg3}
          caption="World Map / RDR Coverage / Shutdowns"
          alt="TODO: Alternative description"
          id=""
        />
        {para4}
        <ScrollyFeature
          id="scrolly-graph"
          story={story2}
          stepEnter={({index, element}) => {
            console.log(index, element.dataset);
            if (element.dataset.queries) {
              toggleSVGclass({
                objId: "chart-q1",
                query: element.dataset.queries,
                toggleClassName: element.dataset.toggle,
              });
            }
          }}
          stepExit={({index, direction}) => {
            console.log(`Local Exit 1: ${index} - ${direction}`);
          }}
        >
          <figure className="scrolly-figure bg-gray-200">
            <FigureSvg
              className="scrolly-figure bg-gray-200"
              svg={svg2}
              caption="Caption As Props 2"
              alt="TODO: Alternative description"
              id="chart-q1"
            />
            <div>
              <p id="scene-counter">Off</p>
              <p id="index-counter">Off</p>
            </div>
          </figure>
        </ScrollyFeature>
        {lorem}
        <FigureSvg
          className="bg-gray-200"
          svg={svg4}
          caption="World Map / RDR Coverage / Shutdowns"
          alt="TODO: Alternative description"
          id=""
        />
        {lorem}
        <section id="analysis-3" className="max-w-6xl">
          <h2 className="sticky-h">Analysis 3</h2>

          <p>
            Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast
            yardarm. Pinnace holystone mizzenmast quarter crows nest nipperkin
            grog yardarm hempen halter furl. Swab barque interloper chantey
            doubloon starboard grog black jack gangway rutters.
          </p>

          {/* <figure ref={ioHook} className={inView ? "fade-in" : "fade-out"}>
            <img src={DummyPNG} alt="Some other data stuff" />
            <figcaption>{`Caption: Example PNG Image`}</figcaption>
          </figure> */}

          <FigureImg
            img={DummyPNG}
            caption="Caption: Example PNG Image"
            alt="TODO - Caption: Example PNG Image"
            id="map-dw-1"
          />

          <p>
            Deadlights jack lad schooner scallywag dance the hempen jig carouser
            broadside cable strike colors. Bring a spring upon her cable
            holystone blow the man down spanker Shiver me timbers to go on
            account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul
            squiffy black spot yardarm spyglass sheet transom heave to.
          </p>

          <p>
            Trysail Sail ho Corsair red ensign hulk smartly boom jib rum
            gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup
            ballast Blimey lee snow crows nest rutters. Fluke jib scourge of the
            seven seas boatswain schooner gaff booty Jack Tar transom spirits.
          </p>
        </section>
        <section id="outro" className="max-w-6xl">
          <h2 className="sticky-h">Outro</h2>

          <p>
            Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast
            yardarm. Pinnace holystone mizzenmast quarter crows nest nipperkin
            grog yardarm hempen halter furl. Swab barque interloper chantey
            doubloon starboard grog black jack gangway rutters.
          </p>

          <p>
            Deadlights jack lad schooner scallywag dance the hempen jig carouser
            broadside cable strike colors. Bring a spring upon her cable
            holystone blow the man down spanker Shiver me timbers to go on
            account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul
            squiffy black spot yardarm spyglass sheet transom heave to.
          </p>

          <p>
            Trysail Sail ho Corsair red ensign hulk smartly boom jib rum
            gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup
            ballast Blimey lee snow crows nest rutters. Fluke jib scourge of the
            seven seas boatswain schooner gaff booty Jack Tar transom spirits.
          </p>
        </section>
      </main>
    </Layout>
  );
};

export default SpotlightOne;
