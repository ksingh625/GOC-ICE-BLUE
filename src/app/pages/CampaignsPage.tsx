import { useNavigate } from "react-router";
import { CampaignInnerPage } from "../App";

export default function CampaignsPage() {
  const navigate = useNavigate();
  return (
    <CampaignInnerPage 
      onClose={() => navigate("/")} 
      onHome={() => navigate("/")} 
    />
  );
}
