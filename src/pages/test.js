import { useSession } from 'next-auth/react';
import SurveyForm from '../components/SurveyForm';
import SurveyList from '../components/SurveyList';
import SurveySummary from '../components/SurveySummary';

export default function TestPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to test</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Component Test Page</h1>
      <p>Welcome, {session.user.name}</p>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>SurveyForm Test</h2>
        <SurveyForm setIsLoading={() => {}} />
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>SurveyList Test</h2>
        <SurveyList />
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>SurveySummary Test</h2>
        <SurveySummary />
      </div>
    </div>
  );
} 