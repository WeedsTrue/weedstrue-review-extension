import React from 'react';
import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Rating,
  Skeleton,
  Stack,
  Text,
  Title
} from '@mantine/core';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Leaf, Message, Photo, Point } from 'tabler-icons-react';
import {
  REVIEW_WEBSITE_URL,
  USER_POST_TYPE,
  USER_POST_TYPE_LIST
} from '../../config/constants';
import { mq } from '../../config/theme';
import { getUserPostLink, stripDateOfUTC } from '../../helpers/format';
const relativeTime = require('dayjs/plugin/relativeTime');

const PostListItem = ({ userPost }) => {
  dayjs.extend(relativeTime);
  const postLink = getUserPostLink(userPost);
  const postType =
    userPost &&
    USER_POST_TYPE_LIST.find(t => t.value === userPost.fkUserPostType);

  return userPost ? (
    <>
      <Stack
        component={Link}
        sx={mq({
          overflow: 'visible',
          padding: 5,
          outline: '1px solid lightgrey',
          textDecoration: 'none',
          color: '#000',
          '&:hover': {
            outline: '2px solid dodgerblue'
          }
        })}
        to={postLink}
      >
        <Group sx={{ alignItems: 'start', gap: 5 }}>
          <Stack
            sx={{ gap: 10, textDecoration: 'none', color: '#000', flex: 1 }}
          >
            <Stack
              sx={{
                gap: 10,
                overflow: 'hidden',
                marginLeft: 5
              }}
            >
              <Stack sx={{ gap: 0 }}>
                <Text
                  color="grey"
                  size={13}
                  sx={{ flexWrap: 'nowrap', display: 'inline' }}
                >
                  Posted by{' '}
                  <Group sx={{ gap: 3, display: 'inline-flex' }}>
                    <Text
                      onClick={e => {
                        e.preventDefault();
                        window
                          .open(
                            `${REVIEW_WEBSITE_URL}/profile/${userPost?.user.username}`,
                            '_blank'
                          )
                          .focus();
                      }}
                      sx={{
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      {userPost.user.username}
                    </Text>
                    <Point size={10} />
                    <Text color="grey" sx={{ fontSize: 12 }}>
                      {dayjs(`${stripDateOfUTC(userPost.created)}Z`).fromNow()}
                    </Text>
                  </Group>
                </Text>
                <Stack sx={{ gap: 5 }}>
                  <Group
                    sx={{
                      gap: 5,
                      flexWrap: 'nowrap',
                      overflow: 'hidden',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Title
                      order={4}
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: '20px'
                      }}
                    >
                      {userPost.title}
                    </Title>
                  </Group>
                </Stack>
              </Stack>
              <Stack sx={{ gap: 5 }}>
                <Group sx={{ flex: 1, justifyContent: 'space-between' }}>
                  <Badge
                    color={postType.color}
                    size="lg"
                    sx={mq({
                      display: 'flex'
                    })}
                    variant="filled"
                  >
                    {postType.label}
                  </Badge>
                  {userPost.fkUserPostType === USER_POST_TYPE.REVIEW.value &&
                    userPost.userRating && (
                      <Rating
                        readOnly
                        sx={mq({
                          marginTop: [3, 3, 0]
                        })}
                        value={userPost.userRating}
                      />
                    )}
                </Group>

                <Stack sx={{ gap: 10 }}>
                  <Text
                    sx={{
                      fontSize: 14,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      display: '-webkit-box',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {userPost.content}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
            <Group sx={{ flex: 1, gap: 10 }}>
              <Group
                sx={mq({
                  gap: 0,
                  placeItems: 'center',
                  marginLeft: 5
                })}
              >
                <ActionIcon color={'dark'} disabled variant="transparent">
                  <Leaf />
                </ActionIcon>
                <Text weight={500}>
                  {userPost.positiveReactionCount -
                    userPost.negativeReactionCount}
                </Text>
                <ActionIcon color={'dark'} disabled variant="transparent">
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

              <Group sx={{ gap: 5 }}>
                <Message size={20} />
                <Text sx={{ fontSize: 14 }} weight={500}>
                  {userPost.commentCount}{' '}
                  {userPost.commentCount === 1 ? 'Comment' : 'Comments'}
                </Text>
              </Group>
              {(userPost.userPostImages.length > 0 ||
                userPost.fkUserPostType === USER_POST_TYPE.REVIEW.value) && (
                <Group sx={{ gap: 5 }}>
                  <Photo size={20} />
                  <Text sx={{ fontSize: 14 }} weight={500}>
                    {userPost.userPostImages.length}{' '}
                    {userPost.userPostImages.length === 1 ? 'Image' : 'Images'}
                  </Text>
                </Group>
              )}
            </Group>
          </Stack>
        </Group>
      </Stack>
    </>
  ) : (
    <Stack
      sx={mq({
        overflow: 'visible',
        padding: 5,
        outline: '1px solid lightgrey',
        color: '#000'
      })}
    >
      <Group sx={{ alignItems: 'start', gap: 5 }}>
        <Stack sx={{ gap: 10, textDecoration: 'none', color: '#000', flex: 1 }}>
          <Stack
            sx={{
              gap: 10,
              overflow: 'hidden',
              marginLeft: 5
            }}
          >
            <Stack sx={{ gap: 5 }}>
              <Skeleton height={26} radius="xl" width="40%" />
              <Skeleton height={20} radius="xl" width={100} />
              <Skeleton height={10} radius="xl" />
              <Skeleton height={10} radius="xl" />
              <Skeleton height={10} radius="xl" width="70%" />
            </Stack>
            <Group>
              <Group sx={{ gap: 5 }}>
                <Skeleton height={20} width={100} />
              </Group>
              <Group>
                <Skeleton height={20} width={64} />
              </Group>
              <Group>
                <Skeleton height={20} width={24} />
              </Group>
            </Group>
          </Stack>
        </Stack>
      </Group>
    </Stack>
  );
};

PostListItem.propTypes = {
  userPost: PropTypes.object
};

export default PostListItem;
