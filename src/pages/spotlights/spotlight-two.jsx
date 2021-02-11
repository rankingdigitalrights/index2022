/* eslint no-param-reassign: off */
import React, {useEffect, useMemo, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import scrollama from "scrollama";

import story from "../../../data/spotlights/soe-map-shutdowns.json";
import Iframe from "../../components/datawrapper";
import Layout from "../../components/layout-spotlights";
import ScrollySteps from "../../components/scrolly-steps";
import SpotlightChart from "../../components/spotlight-chart";
import MyImage from "../../images/spotlights/datawrapper-map-dummy.png";
import {setupSpotlight} from "../../spotlights-one";

// TODO: refactor into spotlight-components

const toggleFade = (inView) => {
  return inView ? "fade-in" : "fade-out";
};

const FigureSvg = ({id, alt, src, caption}) => {
  const [svg, setSvg] = useState(undefined);
  const [ioHook, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then(setSvg)
      .catch(() => undefined);
  }, [src]);

  return (
    <figure
      id={id}
      aria-label={alt}
      ref={ioHook}
      className={`figure-svg spot-figure ${toggleFade(inView)}`}
      dangerouslySetInnerHTML={{
        __html: [`${svg} <figcaption>${caption}</figcaption>`],
      }}
    />
  );
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
      <img src={img.type} alt={alt} type="image/svg+xml" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

const chartData = [
  {id: "twitter", name: "Twitter", value: 37},
  {id: "ooredo", name: "Ooredo", value: 54},
  {id: "apple", name: "Apple", value: 10},
  {id: "amazon", name: "Amazon", value: 67},
];

// TODO: Remove (Temp. to make dev easier)
const para1 = (
  <section className="max-w-6xl">
    <h2>Intro (Staging Test)</h2>
    <p>
      Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast
      yardarm. Pinnace holystone mizzenmast quarter crows nest nipperkin grog
      yardarm hempen halter furl. Swab barque interloper chantey doubloon
      starboard grog black jack gangway rutters.
    </p>

    <FigureSvg
      src="/index2020/svg/q1-governance-export.svg"
      caption="Caption As Props"
      alt="TODO: Alternative description"
      id="graph-q1"
    />

    <p>
      Deadlights jack lad schooner scallywag dance the hempen jig carouser
      broadside cable strike colors. Bring a spring upon her cable holystone
      blow the man down spanker Shiver me timbers to go on account lookout
      wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm
      spyglass sheet transom heave to.
    </p>
    <FigureSvg
      src="/index2020/svg/asia.svg"
      caption="Caption As Props 2"
      alt="TODO: Alternative description"
      id="map-asia-1"
    />
    <p>
      Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway. Case
      shot Shiver me timbers gangplank crack Jennys tea cup ballast Blimey lee
      snow crows nest rutters. Fluke jib scourge of the seven seas boatswain
      schooner gaff booty Jack Tar transom spirits.
    </p>
    {/* <FigureSvg
      src="/index2020/svg/matrix-mock.svg"
      caption="Caption As Props 3"
      alt="TODO: Alternative description"
      id="matrix-3"
    />
    <p>
      Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway. Case
      shot Shiver me timbers gangplank crack Jennys tea cup ballast Blimey lee
      snow crows nest rutters. Fluke jib scourge of the seven seas boatswain
      schooner gaff booty Jack Tar transom spirits.
    </p>
    <FigureSvg
      src="/index2020/svg/soe-fb-youtube.svg"
      caption="Caption As Props 3"
      alt="TODO: Alternative description"
      id="fb-youtube"
    /> */}
    <p>
      Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway. Case
      shot Shiver me timbers gangplank crack Jennys tea cup ballast Blimey lee
      snow crows nest rutters. Fluke jib scourge of the seven seas boatswain
      schooner gaff booty Jack Tar transom spirits.
    </p>
  </section>
);

const para2 = (
  <section className="max-w-6xl">
    <h2>Analysis 1</h2>
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

const SpotlightOne = () => {
  const [ioHook, inView] = useInView({
    threshold: [0.5],
    triggerOnce: false,
  });

  // Hook: state + stateMethod
  const [currentStep, setCurrentStep] = useState();
  // "unhook" / make Obj mutable
  const scrolly1El = useRef(undefined);
  // memoize
  const scroller1 = useMemo(() => scrollama(), []);

  useEffect(() => {
    // arguments passed as ...args from global Step Handler
    const localOnStepEnter = ({element}) => {
      // Hook step --> state of viz
      setCurrentStep(element.dataset.step - 1);
      // console.log(`Local Enter: ${index} - ${direction}`);
    };

    const localOnStepExit = () => {
      // console.log(`Local Exit: ${index} - ${direction}`);
    };

    const unmount1 = setupSpotlight(
      scrolly1El,
      scroller1,
      "#scrolly-1 .step",
      localOnStepEnter,
      localOnStepExit,
    );

    return () => {
      unmount1();
    };
  }, [scroller1, scrolly1El]);

  return (
    <Layout>
      <main className="container mx-auto spotlight">
        {/* // TODO */}
        {para1}

        <section className="max-w-6xl datawrapper-dummy-embed">
          <Iframe
            title="Countries with Facebook's internet.org"
            src="https://datawrapper.dwcdn.net/mcT4c/1/"
            initialHeight={360}
          />
        </section>

        {/* // TODO */}
        {para2}
        <section id="scrolly-1" ref={scrolly1El} className="scrolly">
          <h2>{`Scrolly 1 ${inView}`}</h2>

          <div
            ref={ioHook}
            id="scrolly-canvas"
            className={`scrolly-canvas ${inView ? "fade-in" : "fade-out"}`}
          >
            <figure className="scrolly-figure bg-gray-200">
              <p id="scene-counter">Off</p>
              <p id="index-counter">Off</p>
              <div className="scrolly-chart">
                <SpotlightChart data={chartData} highlightedBar={currentStep} />
              </div>
            </figure>
          </div>

          <ScrollySteps story={story} />
        </section>

        <section id="analysis-3" className="max-w-6xl">
          <h2>Analysis 3</h2>

          <p>
            Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast
            yardarm. Pinnace holystone mizzenmast quarter crows nest nipperkin
            grog yardarm hempen halter furl. Swab barque interloper chantey
            doubloon starboard grog black jack gangway rutters.
          </p>

          {/* <figure ref={ioHook} className={inView ? "fade-in" : "fade-out"}>
            <img src={MyImage} alt="Some other data stuff" />
            <figcaption>{`Caption: Example PNG Image`}</figcaption>
          </figure> */}

          <FigureImg
            img={<MyImage />}
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
          <h2>Outro</h2>

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
