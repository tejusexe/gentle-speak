import { ConversationPractice } from '@/components/ConversationPractice';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center">
            <Link to="/how-to-use">
              <Button variant="outline" size="sm">
                📚 How to Use & Examples
              </Button>
            </Link>
          </div>
          <ConversationPractice />
        </div>
      </div>
    </div>
  );
};

export default Index;