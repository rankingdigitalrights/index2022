import Link from "next/link";
import React, {useState} from "react";

import navigation from "../../data/navigation.json";
import ChevronRight from "../../static/chevron-right.svg";
import {NavigationNode} from "../navigation";

interface SubNavigationProps {
  subNavNodes: NavigationNode[];
}

const SubNavigation = ({subNavNodes}: SubNavigationProps) => {
  const [subSubNavToggle, setSubSubNavToggle] = useState<string | undefined>();
  const [subSubNavNodes, setSubSubNavNodes] = useState<NavigationNode[]>([]);

  const toggleSubSubNav = (label: string, nodes: NavigationNode[]) => {
    if (subSubNavToggle === label) {
      setSubSubNavToggle(undefined);
      setSubSubNavNodes([]);
    } else {
      setSubSubNavToggle(label);
      setSubSubNavNodes(nodes);
    }
  };

  return (
    <div className="flex flex-row divide-x divide-gray-400">
      <ul className="list-none pr-4">
        {subNavNodes.map(({label, href, nodes}) => {
          return (
            <li key={label}>
              {href ? (
                <Link href={href}>
                  <a className="text-blue-500 hover:text-blue-800">{label}</a>
                </Link>
              ) : (
                <button
                  className="flex flex-row justify-between w-40 text-blue-500 hover:text-blue-800"
                  onClick={() => toggleSubSubNav(label, nodes || [])}
                >
                  <span>{label}</span>{" "}
                  <ChevronRight className="stroke-current" />
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {subSubNavNodes.length > 0 ? (
        <ul className="list-none pl-4">
          {subSubNavNodes.map(({label, href}) => {
            return (
              <li key={label} className="mr-6">
                {href ? (
                  <Link href={href}>
                    <a className="text-blue-500 hover:text-blue-800">{label}</a>
                  </Link>
                ) : (
                  <span className="text-blue-500 hover:text-blue-800">
                    {label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

const Navigation = () => {
  const [subNavToggle, setSubNavToggle] = useState<string | undefined>();
  const [subNavNodes, setSubNavNodes] = useState<NavigationNode[]>([]);

  const toggleSubNav = (label: string, nodes: NavigationNode[]) => {
    if (subNavToggle === label) {
      setSubNavToggle(undefined);
      setSubNavNodes([]);
    } else {
      setSubNavToggle(label);
      setSubNavNodes(nodes);
    }
  };

  return (
    <nav className="flex items-center justify-between relative">
      <ul className="flex inset-0 list-none">
        {navigation.map(({label, href, nodes = []}) => {
          return (
            <li key={label} className="mr-6">
              <button onClick={() => toggleSubNav(label, nodes)}>
                {href ? (
                  <Link href={href}>
                    <a className="text-blue-500 hover:text-blue-800">{label}</a>
                  </Link>
                ) : (
                  <span className="text-blue-500 hover:text-blue-800">
                    {label}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Make sure to set the key on the div, otherwise the subSubNav can
       * contain stale nodes. */}
      {subNavNodes.length > 0 ? (
        <div
          key={`sub-nav-${subNavToggle}`}
          className="absolute z-50 bottom-0 inset-0 mt-6 w-full h-full"
        >
          <div className="bg-white border border-gray-600 p-3">
            <SubNavigation subNavNodes={subNavNodes} />
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navigation;
