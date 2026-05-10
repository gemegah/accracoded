import { addIcon } from 'iconify-icon';

import arrowLeft from '@iconify-icons/tabler/arrow-left';
import arrowRight from '@iconify-icons/tabler/arrow-right';
import bell from '@iconify-icons/tabler/bell';
import book2 from '@iconify-icons/tabler/book-2';
import brain from '@iconify-icons/tabler/brain';
import brandFacebook from '@iconify-icons/tabler/brand-facebook';
import brandInstagram from '@iconify-icons/tabler/brand-instagram';
import brandSnapchat from '@iconify-icons/tabler/brand-snapchat';
import brandWhatsapp from '@iconify-icons/tabler/brand-whatsapp';
import brandX from '@iconify-icons/tabler/brand-x';
import brush from '@iconify-icons/tabler/brush';
import calendarEvent from '@iconify-icons/tabler/calendar-event';
import chartBar from '@iconify-icons/tabler/chart-bar';
import check from '@iconify-icons/tabler/check';
import externalLink from '@iconify-icons/tabler/external-link';
import flower from '@iconify-icons/tabler/flower';
import folders from '@iconify-icons/tabler/folders';
import heart from '@iconify-icons/tabler/heart';
import heartPlus from '@iconify-icons/tabler/heart-plus';
import leaf from '@iconify-icons/tabler/leaf';
import link from '@iconify-icons/tabler/link';
import lock from '@iconify-icons/tabler/lock';
import logout from '@iconify-icons/tabler/logout';
import mail from '@iconify-icons/tabler/mail';
import map2 from '@iconify-icons/tabler/map-2';
import mapPin from '@iconify-icons/tabler/map-pin';
import messages from '@iconify-icons/tabler/messages';
import qrcode from '@iconify-icons/tabler/qrcode';
import salad from '@iconify-icons/tabler/salad';
import search from '@iconify-icons/tabler/search';
import sparkles from '@iconify-icons/tabler/sparkles';
import star from '@iconify-icons/tabler/star';
import stretching from '@iconify-icons/tabler/stretching';
import sun from '@iconify-icons/tabler/sun';
import tag from '@iconify-icons/tabler/tag';
import users from '@iconify-icons/tabler/users';
import usersGroup from '@iconify-icons/tabler/users-group';
import x from '@iconify-icons/tabler/x';

import 'iconify-icon';

const TABLER_ICONS = {
  'tabler:arrow-left': arrowLeft,
  'tabler:arrow-right': arrowRight,
  'tabler:bell': bell,
  'tabler:book-2': book2,
  'tabler:brain': brain,
  'tabler:brand-facebook': brandFacebook,
  'tabler:brand-instagram': brandInstagram,
  'tabler:brand-snapchat': brandSnapchat,
  'tabler:brand-whatsapp': brandWhatsapp,
  'tabler:brand-x': brandX,
  'tabler:brush': brush,
  'tabler:calendar-event': calendarEvent,
  'tabler:chart-bar': chartBar,
  'tabler:check': check,
  'tabler:external-link': externalLink,
  'tabler:flower': flower,
  'tabler:folders': folders,
  'tabler:heart': heart,
  'tabler:heart-plus': heartPlus,
  'tabler:leaf': leaf,
  'tabler:link': link,
  'tabler:lock': lock,
  'tabler:logout': logout,
  'tabler:mail': mail,
  'tabler:map-2': map2,
  'tabler:map-pin': mapPin,
  'tabler:messages': messages,
  'tabler:qrcode': qrcode,
  'tabler:salad': salad,
  'tabler:search': search,
  'tabler:sparkles': sparkles,
  'tabler:star': star,
  'tabler:stretching': stretching,
  'tabler:sun': sun,
  'tabler:tag': tag,
  'tabler:users': users,
  'tabler:users-group': usersGroup,
  'tabler:x': x
} as const;

Object.entries(TABLER_ICONS).forEach(([name, icon]) => {
  addIcon(name, icon);
});
