import React from 'react';
import { ActionIcon, Avatar, Group, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Leaf, Point } from 'tabler-icons-react';
import { stripDateOfUTC } from '../../helpers/format';
const relativeTime = require('dayjs/plugin/relativeTime');

const CommentListItem = ({
  comment,
  replyIndexCount,
  replyComments,
  profileSummaryView,
  fkUser
}) => {
  dayjs.extend(relativeTime);
  const replies =
    replyComments?.filter(c => c.fkCommentParent === comment.pkComment) ?? [];
  const isDisabled = comment.hidden || comment.deleted;

  return (
    <Stack
      sx={{
        gap: 0,
        paddingLeft: profileSummaryView ? 10 : 0,
        borderLeft: profileSummaryView ? 'dotted 1px lightgrey' : 'none'
      }}
    >
      <Group
        sx={{
          gap: 10,
          padding: 5,
          placeItems: 'center',
          backgroundColor: 'none'
        }}
      >
        {!profileSummaryView && (
          <Avatar radius="xl" size={25} src={comment.user.avatar} />
        )}

        <Group sx={{ gap: 3 }}>
          <Text sx={{ fontSize: 14 }} weight={500}>
            {comment.user.username}
          </Text>
          <Point size={5} />
          <Text color="grey" sx={{ fontSize: 12 }}>
            {dayjs(stripDateOfUTC(`${comment.created}Z`)).fromNow()}
          </Text>
        </Group>
      </Group>
      <Stack
        sx={{
          marginLeft: profileSummaryView ? 0 : 17,
          gap: 10,
          overflow: 'hidden',
          borderLeft: profileSummaryView ? 'none' : 'solid 2px lightgrey',
          paddingLeft: profileSummaryView ? 0 : 15
        }}
      >
        <Stack
          sx={{
            gap: 5,
            padding: '0px 5px',
            backgroundColor: 'none'
          }}
        >
          {isDisabled ? (
            <Text
              color="grey"
              size={12}
              sx={{ fontStyle: 'italic' }}
              weight={500}
            >
              Comment has been {comment.deleted ? 'deleted' : 'hidden'}.
            </Text>
          ) : (
            <Text
              sx={{
                fontSize: 14,
                whiteSpace: 'pre-wrap'
              }}
            >
              {comment.content}
            </Text>
          )}
          <Group sx={{ gap: 5 }}>
            {!profileSummaryView && (
              <Group sx={{ gap: 5, marginRight: 5 }}>
                <ActionIcon
                  color={'dark'}
                  disabled
                  onClick={() => {}}
                  size={24}
                  variant="transparent"
                >
                  <Leaf />
                </ActionIcon>
                <Text size={14} weight={500}>
                  {comment.positiveReactionCount -
                    comment.negativeReactionCount}
                </Text>
                <ActionIcon
                  color={'dark'}
                  disabled
                  onClick={() => {}}
                  size={24}
                  variant="transparent"
                >
                  <Leaf
                    style={{
                      transform: 'rotate(180deg)',
                      MozTransform: 'rotate(180deg)',
                      WebkitTransform: 'rotate(180deg)',
                      msTransform: 'rotate(180deg)'
                    }}
                  />
                </ActionIcon>
              </Group>
            )}
          </Group>
        </Stack>
        {(!replyIndexCount || replyIndexCount <= 2) &&
          replies.map(r => (
            <CommentListItem
              comment={r}
              fkUser={fkUser}
              key={r.pkComment}
              profileSummaryView={profileSummaryView}
              replyComments={replyComments}
              replyIndexCount={!replyIndexCount ? 1 : replyIndexCount + 1}
            />
          ))}
      </Stack>
    </Stack>
  );
};

CommentListItem.propTypes = {
  comment: PropTypes.object,
  fkUser: PropTypes.number,
  profileSummaryView: PropTypes.bool,
  replyComments: PropTypes.array,
  replyIndexCount: PropTypes.number
};

export default CommentListItem;
