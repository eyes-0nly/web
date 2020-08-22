import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Radio from '@material-ui/core/Radio';
import formatDuration from 'format-duration';

function ChapterItem({
  active, start, end, title, onClick,
}) {
  const duration = end - start;

  return (
    <ListItem
      className="ChapterItem"
      button
      onClick={onClick}
    >
      <ListItemIcon>
        <Radio
          checked={active}
          tabIndex={-1}
        />
      </ListItemIcon>
      <ListItemText>
        {title}
        <span className="ChapterItem-duration">
          {formatDuration(duration * 1000)}
        </span>
      </ListItemText>
    </ListItem>
  );
}

ChapterItem.propTypes = {
  active: PropTypes.bool.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

function Chapters({
  className,
  available,
  start,
  end,
  onChange,
}) {
  return (
    <List className={className} disablePadding>
      {available.map((chapter) => (
        <ChapterItem
          key={chapter.start}
          onClick={() => onChange(chapter)}
          active={chapter.start === start && chapter.end === end}
          start={chapter.start}
          end={chapter.end}
          title={chapter.title}
        />
      ))}
    </List>
  );
}

Chapters.propTypes = {
  className: PropTypes.string,
  available: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Chapters;
