import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, Divider, Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import PostListFilter from './PostListFilter';
import PostListItem from './PostListItem';
import { REVIEW_WEBSITE_URL } from '../../config/constants';
import { mq } from '../../config/theme';
import { Context as ReviewsContext } from '../../providers/ReviewsProvider';

const PostList = ({
  isLoading,
  fkUser,
  fkBrand,
  fkProduct,
  searchOnRender,
  noPostsAvailableTextOverride
}) => {
  const { pathname } = useLocation();
  const hasFetched = useRef(false);
  const { state, fetchUserPosts } = useContext(ReviewsContext);
  const [filterState, setFilterState] = useState({
    sortBy: 'trending',
    fkUserPostType: fkBrand || fkProduct ? 1 : null,
    skip: null,
    totalCount: 0,
    isLoading: false,
    showMoreLoading: false
  });

  useEffect(() => {
    if (searchOnRender) {
      setFilterState({
        ...filterState,
        isLoading: true
      });
      fetchUserPosts(
        { ...filterState, fkUser, fkBrand, fkProduct },
        totalCount =>
          setFilterState({
            ...filterState,
            totalCount,
            isLoading: false,
            skip: null,
            showMoreLoading: false
          })
      );
      hasFetched.current = true;
    }
  }, [searchOnRender]);

  const onFilterChange = (name, value) => {
    const newState = {
      ...filterState,
      [name]: value,
      isLoading: true
    };
    newState.showMoreLoading = !!newState.skip;

    setFilterState(newState);
    fetchUserPosts({ ...newState, fkUser, fkBrand, fkProduct }, totalCount =>
      setFilterState({
        ...newState,
        totalCount,
        isLoading: false,
        skip: null,
        showMoreLoading: false
      })
    );
  };

  return (
    <Stack sx={mq({ flex: 1, gap: 10 })}>
      <PostListFilter
        filterState={filterState}
        isLoading={isLoading}
        onFilterChange={onFilterChange}
      />
      <Divider />
      {(searchOnRender && !hasFetched.current) || state.userPosts.loading ? (
        <>
          <PostListItem />
          <PostListItem />
          <PostListItem />
          <PostListItem />
        </>
      ) : state.userPosts.value.length === 0 ? (
        <Card>
          <Stack sx={{ padding: 30 }}>
            <Button
              color="blue"
              onClick={() =>
                window.open(`${REVIEW_WEBSITE_URL}${pathname}/submit`, '_blank')
              }
              variant="outline"
            >
              {!noPostsAvailableTextOverride
                ? 'Be the first to post!'
                : noPostsAvailableTextOverride}
            </Button>
          </Stack>
        </Card>
      ) : (
        state.userPosts.value.map(p => (
          <PostListItem key={p.pkUserPost} userPost={p} />
        ))
      )}
      {!isLoading && filterState.totalCount > state.userPosts.value.length && (
        <Button
          color="dark"
          loading={filterState.showMoreLoading}
          onClick={() => onFilterChange('skip', state.userPosts.value.length)}
          sx={{ margin: '10px auto' }}
          variant="outline"
        >
          Show More
        </Button>
      )}
    </Stack>
  );
};

PostList.propTypes = {
  fkBrand: PropTypes.number,
  fkProduct: PropTypes.number,
  fkUser: PropTypes.number,
  hidePostSubmit: PropTypes.bool,
  isLoading: PropTypes.bool,
  noPostsAvailableTextOverride: PropTypes.string,
  searchOnRender: PropTypes.bool,
  showFollowingOnly: PropTypes.bool
};

export default PostList;
