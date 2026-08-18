import crypto from 'crypto';
import React from 'react';
import { Contact, Utils } from 'mailspring-exports';

/*
Renders the sender's Gravatar layered above a colored circle containing their
initials. Gravatar's `d=blank` option returns a transparent image when no
Gravatar exists for the address, so the initials show through as a fallback.
*/
export default class MessageAvatar extends React.Component<{ contact: Contact }> {
  static displayName = 'MessageAvatar';

  render() {
    const { contact } = this.props;
    const email = (contact.email || '').toLowerCase().trim();

    const hue = Utils.hueForString(email);
    const bgColor = `hsl(${hue}, 50%, 45%)`;

    const hash = crypto.createHash('sha256').update(email).digest('hex');
    const gravatarBg = `url("https://www.gravatar.com/avatar/${hash}/?s=88&d=blank")`;

    return (
      <div className="message-avatar" style={{ backgroundColor: bgColor }}>
        <div className="layer initials">{contact.nameAbbreviation()}</div>
        <div className="layer gravatar" style={{ backgroundImage: gravatarBg }} />
      </div>
    );
  }
}
