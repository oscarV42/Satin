import Topbar from "../../components/topbar";
import Sidebar from "../../components/sidebar";
// import Feed from "../../components/feed/Feed";
// import Rightbar from "../../components/rightbar/Rightbar";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        {/* <Feed/>
        <Rightbar/> */}
      </div>
    </>
  );
}