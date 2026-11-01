import type { NotifyItem } from "./type"

export const notifyData: NotifyItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "V3 Admin Vite is live",
    datetime: "4 years ago",
    description: "An AI-friendly admin dashboard template based on mainstream technologies such as Vue3, Vite, TypeScript, and Element Plus"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "V3 Admin is live",
    datetime: "5 years ago",
    description: "A basic admin system solution based on Vue3, TypeScript, Element Plus, Pinia, and Vue CLI 5.x"
  }
]

export const messageData: NotifyItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "From The Truman Show",
    description: "In case I don't see you, good afternoon, good evening, and good night",
    datetime: "1998-06-05"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "From A Chinese Odyssey",
    description: "If I have to put a time limit on this love, I wish it would be ten thousand years",
    datetime: "1995-02-04"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "From My Neighbor Totoro",
    description: "With a kind heart, you will surely meet angels along the way",
    datetime: "1988-04-16"
  }
]

export const todoData: NotifyItem[] = [
  {
    title: "Task name",
    description: "This guy is lazy and left nothing behind",
    extra: "Not started",
    status: "info"
  },
  {
    title: "Task name",
    description: "This guy is lazy and left nothing behind",
    extra: "In progress",
    status: "primary"
  },
  {
    title: "Task name",
    description: "This guy is lazy and left nothing behind",
    extra: "Timed out",
    status: "danger"
  }
]
