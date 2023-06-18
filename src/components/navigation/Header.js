import React from 'react';
import { ActionIcon, Group, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Leaf, X } from 'tabler-icons-react';
import { REVIEW_WEBSITE_URL } from '../../config/constants';

const Header = ({ onClose }) => {
  const { key, pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Group sx={{ justifyContent: 'space-between', padding: 10 }}>
      {key !== 'default' && (
        <ActionIcon color="dark" onClick={() => navigate(-1)} size={22}>
          <ArrowLeft size={22} />
        </ActionIcon>
      )}
      <Group
        onClick={() =>
          window.open(`${REVIEW_WEBSITE_URL}${pathname}`, '_blank')
        }
        sx={{ gap: 1, cursor: 'pointer' }}
      >
        <Leaf color="dodgerblue" size={22} />
        <Title order={5}>WeedsTrue Reviews</Title>
      </Group>

      {onClose && (
        <ActionIcon color="dark" onClick={onClose} size={22}>
          <X size={22} />
        </ActionIcon>
      )}
    </Group>
  );
};

Header.propTypes = {
  onClose: PropTypes.func
};

export default Header;
