import React, { FC, useContext } from "react";
import { SelectedLaunchesContext } from "../../../context/SelectedLaunchesContext";
import Link from "@mui/joy/Link";
import { DefaultVariantProp } from "@mui/joy/styles/types";
import { thousandSeparator } from "../../../utils/thousandSeparator";
import { launchInfoClasses as classes } from "../../../configs/classNames";
import styles from "./style.module.scss";

interface ILaunchInfoProps {}
interface ILink {
  name: string;
  link: string;
  variant: string;
}

export const LaunchInfo: FC<ILaunchInfoProps> = () => {
  const { clickedLaunch } = useContext(SelectedLaunchesContext);
  const links: ILink[] = [
    {
      link: clickedLaunch.links?.video_link || "",
      name: "Watch video",
      variant: "solid",
    },
    {
      link: clickedLaunch.links?.wikipedia || "",
      name: "Open Wikipedia",
      variant: "soft",
    },
    {
      link: clickedLaunch.links?.article_link || "",
      name: "Read article",
      variant: "outlined",
    },
  ].filter((link) => !!link.link);

  return (
    <div className={styles[classes.main]}>
      <p className={styles[classes.title]}>{clickedLaunch.mission_name}</p>
      {!!clickedLaunch.details && (
        <p className={styles[classes.text]}>{clickedLaunch.details}</p>
      )}
      {!!clickedLaunch.rocket?.rocket && (
        <p className={styles[classes.text]}>
          Rocket used is{" "}
          {!!clickedLaunch.rocket.rocket.wikipedia ? (
            <strong>
              {" "}
              <a href={clickedLaunch.rocket?.rocket?.wikipedia}>
                {clickedLaunch.rocket?.rocket_name}
              </a>
            </strong>
          ) : (
            <strong>{clickedLaunch.rocket?.rocket_name}</strong>
          )}{" "}
          with mass{" "}
          <strong>
            {thousandSeparator(clickedLaunch.rocket?.rocket?.mass?.kg || 0)}
          </strong>{" "}
          kg.
        </p>
      )}

      <div className={styles[classes.links]}>
        {links.map((link) => (
          <div key={link.name} className={styles[classes.linksItem]}>
            <Link
              href={link.link}
              variant={link.variant as DefaultVariantProp}
              underline="none"
              target="_blank"
            >
              {link.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
