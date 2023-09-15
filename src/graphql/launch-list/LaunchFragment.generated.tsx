import * as Types from '../../types/spaceX.generated';

import { gql } from '@apollo/client';
export type LaunchItemFragment = { __typename?: 'Launch', details?: string | null, id?: string | null, is_tentative?: boolean | null, launch_date_utc?: any | null, launch_success?: boolean | null, mission_name?: string | null, upcoming?: boolean | null, links?: { __typename?: 'LaunchLinks', article_link?: string | null, mission_patch_small?: string | null, video_link?: string | null, wikipedia?: string | null } | null, rocket?: { __typename?: 'LaunchRocket', rocket_name?: string | null, rocket?: { __typename?: 'Rocket', description?: string | null, id?: string | null, wikipedia?: string | null, mass?: { __typename?: 'Mass', kg?: number | null } | null } | null } | null };

export const LaunchItemFragmentDoc = gql`
    fragment LaunchItem on Launch {
  details
  id
  is_tentative
  launch_date_utc
  launch_success
  links {
    article_link
    mission_patch_small
    video_link
    wikipedia
  }
  mission_name
  rocket {
    rocket {
      description
      id
      mass {
        kg
      }
      wikipedia
    }
    rocket_name
  }
  upcoming
}
    `;