import React, { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { cn } from '../lib/utils';
import MatchCalculator from '../components/calculator/MatchCalculator';
import InitialAssignments from '../components/calculator/InitialAssignments';

const Calculator = () => {
  const [mode, setMode] = useState('calculator'); // 'calculator' | 'assignments'

  if (mode === 'assignments') {
    return <InitialAssignments onBack={() => setMode('calculator')} />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <PageHeader 
        title={
          <span className="flex items-center justify-center gap-3">
            <CalcIcon className="h-8 w-8 text-primary" />
            Court Calculator
          </span>
        }
        subtitle="Enter scores to calculate rankings and next court assignments."
        center
      >
        <div className="flex justify-center mt-4">
          <div className="bg-surface-highlight p-1 rounded-lg inline-flex">
            <button
              onClick={() => setMode('calculator')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                mode === 'calculator' ? "bg-primary text-text-main shadow-sm" : "text-text-muted hover:text-text-main"
              )}
            >
              Match Calculator
            </button>
            <button
              onClick={() => setMode('assignments')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                mode === 'assignments' ? "bg-primary text-text-main shadow-sm" : "text-text-muted hover:text-text-main"
              )}
            >
              Initial Assignments
            </button>
          </div>
        </div>
      </PageHeader>

      <MatchCalculator />
    </div>
  );
};

export default Calculator;
