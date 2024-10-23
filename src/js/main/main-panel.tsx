import FeaturedAnimations from "./components/featured-animations";

const MainPanel = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 style={{ color: "#ff5b3b" }}>Featured Public Lottie Animations</h1>
      <FeaturedAnimations />
    </div>
  );
};
export default MainPanel;
