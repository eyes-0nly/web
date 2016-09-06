import * as React from 'react';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardActions from 'material-ui/Card/CardActions';
import CardText from 'material-ui/Card/CardText';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Avatar from '../Avatar';

const tempRoleIDToReadableName = [
  'User',
  'Special',
  'Moderator',
  'Manager',
  'Admin'
];

const tempRoleIDToRoleName = {
  0: 'default',
  1: 'special',
  2: 'moderator',
  3: 'manager',
  4: 'admin'
};

const UserCard = ({ muiTheme, user }) => (
  <Card className="UserCard">
    <CardHeader
      title={user.username}
      subtitle={tempRoleIDToReadableName[user.role]}
      subtitleColor={muiTheme.rankColors[tempRoleIDToRoleName[user.role]]}
      avatar={<Avatar className="UserCard-avatar" user={user} />}
    />
    <CardActions>
      {/* Currently empty */}
    </CardActions>
  </Card>
);

UserCard.propTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired
};

export default muiThemeable()(UserCard);
