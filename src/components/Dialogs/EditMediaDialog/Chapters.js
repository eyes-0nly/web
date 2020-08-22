import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';

function Chapters({
  className,
  available,
  start,
  end,
  onChange,
}) {
  return (
    <List className={className} dense disablePadding>
      {available.map((chapter) => (
        <ListItem
          key={chapter.start}
          button
          onClick={() => onChange(chapter)}
        >
          <ListItemIcon>
            <Radio
              checked={chapter.start === start && chapter.end === end}
              tabIndex={-1}
            />
          </ListItemIcon>
          <ListItemText primary={chapter.title} />
        </ListItem>
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
