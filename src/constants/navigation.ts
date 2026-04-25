import { MessageSquareText, SquarePlus } from 'lucide-react';

export const navigation = [
    {
        label: 'Prompt Playground',
        path: '/playground',
        roles: ['admin', 'developer', 'user'],
        icon: MessageSquareText
    },
    {
        label: 'Template Library',
        path: '/templates',
        roles: ['admin', 'developer', 'user'],
        icon: SquarePlus
    }, {
        label: 'Evaluation Reports',
        path: '/evaluation',
        roles: ['admin', 'developer'],
        icon: SquarePlus
    }, {
        label: 'Settings',
        path: '/settings',
        roles: ['admin'],
        icon: SquarePlus,
        divider: true
    },
]