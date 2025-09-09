//Layouts
import { HeaderOnly } from '~/Layout';

//Pages
import Home from '~/Pages/Home';
import Following from '~/Pages/Following';
import Friends from '~/Pages/Friends';
import Profile from '~/Pages/Profile';
import Upload from '~/Pages/Upload';
import Explore from '~/Pages/Explore';
import Live from '~/Pages/Live';
import Video from '~/Pages/Video';

import config from '~/config';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.foryou, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.friends, component: Friends},
    { path: config.routes.nickname, component: Profile },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.explore, component: Explore },
    { path: config.routes.live, component: Live },
    { path: config.routes.video, component: Video },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
