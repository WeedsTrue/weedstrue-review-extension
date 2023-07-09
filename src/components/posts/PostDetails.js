import React, { useContext, useEffect, useRef } from 'react';
import {
  ActionIcon,
  Alert,
  Badge,
  Divider,
  Group,
  Rating,
  Skeleton,
  Stack,
  Text,
  Title
} from '@mantine/core';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import { Leaf, Message, Point } from 'tabler-icons-react';
import UserPostImageCarousel from './UserPostImageCarousel';
import {
  REVIEW_WEBSITE_URL,
  USER_POST_TYPE,
  USER_POST_TYPE_LIST
} from '../../config/constants';
import { stripDateOfUTC } from '../../helpers/format';
import { Context as ReviewsContext } from '../../providers/ReviewsProvider';
import CommentList from '../comments/CommentList';
import ProductAttribute from '../products/ProductAttribute';
import ProductEffect from '../products/ProductEffect';
const relativeTime = require('dayjs/plugin/relativeTime');

const PostDetails = ({ postItem }) => {
  const { pathname } = useLocation();
  dayjs.extend(relativeTime);
  const hasFetched = useRef(false);
  const { state, fetchUserPost } = useContext(ReviewsContext);
  const { uuid } = useParams();
  const { value: userPost } = state.userPost;
  const postType =
    userPost &&
    USER_POST_TYPE_LIST.find(t => t.value === userPost.fkUserPostType);

  useEffect(() => {
    fetchUserPost(uuid);
    hasFetched.current = true;
  }, []);

  return (
    <Group
      sx={{
        flex: 1,
        placeItems: 'start',
        justifyContent: 'center',
        alignItems: 'stretch'
      }}
    >
      {hasFetched.current && !state.userPost.loading && userPost ? (
        <Stack
          style={{ flex: 1 }}
          sx={{
            gap: 0
          }}
        >
          <Stack sx={{ gap: 20, flex: 1 }}>
            <Group sx={{ placeItems: 'start', flex: 1 }}>
              <Stack sx={{ gap: 10, flex: 1 }}>
                <Stack
                  sx={{
                    gap: 5,
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
                      <Group sx={{ gap: 3, display: 'inline-flex' }}>
                        <Text
                          onClick={() =>
                            window.open(
                              `${REVIEW_WEBSITE_URL}/profile/${userPost.user.username}`,
                              '_blank'
                            )
                          }
                          sx={{
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          Posted by {userPost.user.username}
                        </Text>
                        <Point size={10} />
                        <Text color="grey" sx={{ fontSize: 12 }}>
                          {dayjs(
                            `${stripDateOfUTC(userPost.created)}Z`
                          ).fromNow()}
                        </Text>
                        {userPost.updated && (
                          <>
                            <Point size={10} />
                            <Text color="grey" sx={{ fontSize: 12 }}>
                              Updated {dayjs(userPost.updated).fromNow()}
                            </Text>
                          </>
                        )}
                      </Group>
                    </Text>
                    {!userPost.hidden && (
                      <Title
                        onClick={() =>
                          window.open(
                            `${REVIEW_WEBSITE_URL}${pathname}`,
                            '_blank'
                          )
                        }
                        order={4}
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {userPost.title}
                      </Title>
                    )}
                  </Stack>
                  <Group sx={{ justifyContent: 'space-between' }}>
                    <Badge color={postType.color} size="lg" variant="filled">
                      {postType.label}
                    </Badge>
                    {!userPost.hidden &&
                      userPost.fkUserPostType === USER_POST_TYPE.REVIEW.value &&
                      userPost.userRating && (
                        <Rating readOnly value={userPost.userRating} />
                      )}
                  </Group>
                  {!userPost.hidden &&
                    userPost.fkUserPostType === USER_POST_TYPE.REVIEW.value && (
                      <>
                        {userPost.attributes.length > 0 && (
                          <Group sx={{ gap: 0 }}>
                            {userPost.attributes.map((a, index) => (
                              <React.Fragment key={a.fkProductAttributeType}>
                                <ProductAttribute
                                  attribute={a}
                                  sx={{ marginRight: 5 }}
                                />
                                {index !== userPost.attributes.length - 1 && (
                                  <Stack sx={{ marginRight: 5 }}>
                                    <Point size={10} />
                                  </Stack>
                                )}
                              </React.Fragment>
                            ))}
                          </Group>
                        )}
                        {userPost.effectTypes.length > 0 && (
                          <Group sx={{ gap: 10 }}>
                            {userPost.effectTypes.map(e => (
                              <ProductEffect fkProductEffectType={e} key={e} />
                            ))}
                          </Group>
                        )}
                      </>
                    )}
                  {userPost.hidden ? (
                    <Alert sx={{ margin: 40 }} variant="outline">
                      <Text
                        sx={{ padding: 30, textAlign: 'center' }}
                        weight={500}
                      >
                        Content has been hidden.
                      </Text>
                    </Alert>
                  ) : (
                    <>
                      {userPost.userPostImages.length > 0 && (
                        <Stack sx={{ padding: '5px 0px' }}>
                          <UserPostImageCarousel
                            userPostImages={userPost.userPostImages}
                          />
                        </Stack>
                      )}
                      <Text
                        sx={{
                          fontSize: 16,
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {userPost.content}
                      </Text>
                    </>
                  )}
                </Stack>

                <Group>
                  <Group
                    sx={{
                      gap: 0,
                      placeItems: 'center',
                      marginLeft: 5
                    }}
                  >
                    <ActionIcon color={'dark'} disabled variant="transparent">
                      <Leaf />
                    </ActionIcon>
                    <Text weight={500}>
                      {userPost?.positiveReactionCount -
                        userPost?.negativeReactionCount}
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
                      {userPost.comments.length}{' '}
                      {userPost.comments.length === 1 ? 'Comment' : 'Comments'}
                    </Text>
                  </Group>
                </Group>
              </Stack>
            </Group>
            <Stack sx={{ gap: 0 }}>
              <Text size={14} weight={500}>
                Comments
              </Text>
              <Divider />
              <CommentList
                comments={state.comments.value}
                userPost={userPost}
              />
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Stack
          style={{ flex: 1 }}
          sx={{
            gap: 0
          }}
        >
          <Stack sx={{ gap: 20, flex: 1 }}>
            <Group sx={{ placeItems: 'start', flex: 1 }}>
              <Stack sx={{ gap: 10, flex: 1, alignSelf: 'stretch' }}>
                <Stack
                  sx={{
                    flex: 1,
                    gap: 5,
                    overflow: 'hidden',
                    marginLeft: 5,
                    minHeight: []
                  }}
                >
                  <Stack sx={{ gap: 5 }}>
                    <Text
                      color="grey"
                      size={13}
                      sx={{ flexWrap: 'nowrap', display: 'inline' }}
                    >
                      <Group sx={{ gap: 3, display: 'inline-flex' }}>
                        <Skeleton height={14} width={150} />
                        <Point size={10} />
                        <Skeleton height={14} width={50} />
                      </Group>
                    </Text>
                    <Group
                      sx={{
                        gap: 5,
                        flexWrap: 'nowrap',
                        overflow: 'hidden',
                        justifyContent: 'space-between',
                        alignItems: 'start'
                      }}
                    >
                      <Skeleton height={24} width={'80%'} />
                    </Group>
                  </Stack>
                  <Group>
                    <Skeleton height={26} radius={'xl'} width={100} />
                  </Group>
                </Stack>

                <Group>
                  <Group sx={{ gap: 10 }}>
                    <Skeleton height={26} radius={'xl'} width={100} />
                    <Skeleton height={26} radius={'xl'} width={50} />
                  </Group>
                </Group>
              </Stack>
            </Group>
          </Stack>
        </Stack>
      )}
    </Group>
  );
};

PostDetails.propTypes = {
  isLoading: PropTypes.bool,
  postItem: PropTypes.object
};

export default PostDetails;
