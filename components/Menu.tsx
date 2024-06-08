'use client'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TableViewIcon from '@mui/icons-material/TableView';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import GradingIcon from '@mui/icons-material/Grading';
import { useRouter } from 'next/navigation'

type MenuProps = {
  onClick: () => void
}

const items = [
  {
    name: 'ガイド',
    path: '/',
    icon: <GradingIcon />,
  },
  {
    name: '卓組',
    path: '/tables',
    icon: <TableViewIcon />,
  },
  {
    name: 'スコア',
    path: '/scores',
    icon: <AppRegistrationIcon />,
  },
  {
    name: 'ギャラリー',
    path: '/gallery',
    icon: <InsertPhotoIcon />,
  },
]

export default function Menu({ onClick }: MenuProps) {
  const router = useRouter()
  const toRoute = (path: string) => () => {
    router.push(path)
    onClick()
  }

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {items.map(({ name, path, icon }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={toRoute(path)}>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}