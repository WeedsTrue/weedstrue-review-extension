import React from 'react';
import { Button, Card, Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import CommentListItem from './CommentListItem';
import { REVIEW_WEBSITE_URL } from '../../config/constants';

const CommentList = ({ comments, isLoading }) => {
  const { pathname } = useLocation();
  const commentsSorted =
    comments?.sort((a, b) => new Date(b.created) - new Date(a.created)) ?? [];
  const postComments = commentsSorted.filter(c => !c.fkCommentParent);
  const commentReplies = commentsSorted.filter(c => c.fkCommentParent);

  return (
    <Stack sx={{ flex: 1, gap: 15 }}>
      {isLoading ? (
        <>
          <CommentListItem />
          <CommentListItem />
          <CommentListItem />
          <CommentListItem />
        </>
      ) : comments.length === 0 ? (
        <Card>
          <Stack sx={{ padding: 30 }}>
            <Button
              color="blue"
              onClick={() =>
                window.open(`${REVIEW_WEBSITE_URL}${pathname}/submit`, '_blank')
              }
              variant="outline"
            >
              Be the first to comment!
            </Button>
          </Stack>
        </Card>
      ) : (
        postComments.map(c => (
          <CommentListItem
            comment={c}
            key={c.pkComment}
            replyComments={commentReplies}
          />
        ))
      )}
    </Stack>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array,
  isLoading: PropTypes.bool
};

export default CommentList;
