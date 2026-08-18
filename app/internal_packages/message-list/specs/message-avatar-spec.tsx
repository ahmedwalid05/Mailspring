import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import crypto from 'crypto';
import { Contact } from 'mailspring-exports';
import MessageAvatar from '../lib/message-avatar';

describe('MessageAvatar', function () {
  const makeAvatar = (contact) =>
    ReactTestUtils.renderIntoDocument(<MessageAvatar contact={contact} />) as any;

  it('renders the contact initials', function () {
    const avatar = makeAvatar(new Contact({ name: 'Ben Gotow', email: 'ben@foundry376.com' }));
    const initials = ReactTestUtils.findRenderedDOMComponentWithClass(avatar, 'initials');
    expect((ReactDOM.findDOMNode(initials) as HTMLElement).textContent).toBe('BG');
  });

  it('requests the gravatar for the normalized email address', function () {
    const avatar = makeAvatar(new Contact({ name: 'Ben', email: ' Ben@Foundry376.com ' }));
    const hash = crypto.createHash('sha256').update('ben@foundry376.com').digest('hex');
    const layer = ReactTestUtils.findRenderedDOMComponentWithClass(avatar, 'gravatar');
    const bg = (ReactDOM.findDOMNode(layer) as HTMLElement).style.backgroundImage;
    expect(bg).toContain(hash);
    expect(bg).toContain('d=blank');
  });

  it('renders initials even when the contact has no name', function () {
    const avatar = makeAvatar(new Contact({ name: '', email: 'ben@foundry376.com' }));
    expect(ReactTestUtils.findRenderedDOMComponentWithClass(avatar, 'initials')).toBeDefined();
  });
});
