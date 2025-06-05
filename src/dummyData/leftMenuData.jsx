import { faTachometerAlt, faKey, faCar, faNewspaper, faIdCard, faStore, faBell, faMapMarkerAlt, faCalendarAlt, faClock, faVideo, faHandshake } from "@fortawesome/free-solid-svg-icons";
import SalesPartner from "../components/SalesPartner";
import Leads from "../components/Leads";
import ParkingSpaceOwner from "../components/ParkingSpaceOwner";
import NewsLetter from "../components/NewsLetter";
import Contact from "../components/Contact";
import TwoParkSale from "../components/TwoParkSale";
import Messages from "../components/Messages";
import Locations from "../components/Locations";
import Bookings from "../components/Bookings";
import Activations from "../components/Activations";
import AllParkEvents from "../components/AllParkEvents";
import NewParkingRequest from "../components/NewParkingRequest";
import DashboardPageData from "../components/DashboardPageData";

export const leftMenuData = [
  {
    name: "Dashboard",
    icon: faTachometerAlt,
    path: "dashboard-data",
    element: <DashboardPageData />,
  },
  {
    name: "Sales partner",
    icon: faKey,
    path: "sales-partner",
    element: <SalesPartner />,
  },
  {
    name: "Parking space owner",
    icon: faCar,
    path: "parking-space-owner",
    element: <ParkingSpaceOwner />,
  },
  {
    name: "Leads",
    icon: faHandshake,
    path: "leads",
    element: <Leads />,
  },
  {
    name: "Newsletter (website)",
    icon: faNewspaper,
    path: "news-letter",
    element: <NewsLetter />,
  },
  {
    name: "Contact (Website)",
    icon: faIdCard,
    path: "contact",
    element: <Contact />,
  },
  {
    name: "2Park Sale",
    icon: faStore,
    path: "2park-sale",
    // element: <TwoParkSale />,
    children: [
      {
        name: "Option A",
        path: "2park-sale-option-a",
        element: <TwoParkSale type="a" />,
      },
      {
        name: "Option B",
        path: "2park-sale-option-b",
        element: <TwoParkSale type="b" />,
      },
      {
        name: "Option C",
        path: "2park-sale-option-b",
        element: <TwoParkSale type="b" />,
      },
    ],
  },
  {
    name: "Messages",
    icon: faBell,
    path: "messages",
    element: <Messages />,
  },
  {
    name: "Locations",
    icon: faMapMarkerAlt,
    path: "locations",
    element: <Locations />,
  },
  {
    name: "Bookings",
    icon: faCalendarAlt,
    path: "bookings",
    element: <Bookings />,
  },
  {
    name: "Activations",
    icon: faClock,
    path: "activations",
    element: <Activations />,
  },
  {
    name: "All park events",
    icon: faVideo,
    path: "all-park-events",
    element: <AllParkEvents />,
  },
  {
    name: "new parking request",
    icon: faCar,
    path: "new-parking-request",
    element: <NewParkingRequest />,
  },
];
