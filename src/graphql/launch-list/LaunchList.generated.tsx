import * as Types from '../../types/spaceX.generated';

import { gql } from '@apollo/client';
import { LaunchItemFragmentDoc } from './LaunchFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetLaunchesQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetLaunchesQuery = { __typename?: 'Query', launches?: Array<{ __typename?: 'Launch', details?: string | null, id?: string | null, is_tentative?: boolean | null, launch_date_utc?: any | null, launch_success?: boolean | null, mission_name?: string | null, upcoming?: boolean | null, links?: { __typename?: 'LaunchLinks', article_link?: string | null, mission_patch_small?: string | null, video_link?: string | null, wikipedia?: string | null } | null, rocket?: { __typename?: 'LaunchRocket', rocket_name?: string | null, rocket?: { __typename?: 'Rocket', description?: string | null, id?: string | null, wikipedia?: string | null, mass?: { __typename?: 'Mass', kg?: number | null } | null } | null } | null } | null> | null };


export const GetLaunchesDocument = gql`
    query getLaunches($limit: Int) {
  launches(limit: $limit) {
    ...LaunchItem
  }
}
    ${LaunchItemFragmentDoc}`;

/**
 * __useGetLaunchesQuery__
 *
 * To run a query within a React component, call `useGetLaunchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLaunchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLaunchesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetLaunchesQuery(baseOptions?: Apollo.QueryHookOptions<GetLaunchesQuery, GetLaunchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLaunchesQuery, GetLaunchesQueryVariables>(GetLaunchesDocument, options);
      }
export function useGetLaunchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLaunchesQuery, GetLaunchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLaunchesQuery, GetLaunchesQueryVariables>(GetLaunchesDocument, options);
        }
export type GetLaunchesQueryHookResult = ReturnType<typeof useGetLaunchesQuery>;
export type GetLaunchesLazyQueryHookResult = ReturnType<typeof useGetLaunchesLazyQuery>;
export type GetLaunchesQueryResult = Apollo.QueryResult<GetLaunchesQuery, GetLaunchesQueryVariables>;