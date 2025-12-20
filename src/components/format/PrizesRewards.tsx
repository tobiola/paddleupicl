import React from 'react';
import Card from '../ui/Card';
import { Trophy, CheckCircle } from 'lucide-react';
import { rules } from '../../data/rules';

const PrizesRewards: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-main mb-4">Prizes & Rewards</h2>
        <p className="text-text-muted max-w-2xl mx-auto">Top performers from each season earn court credits, club points, and guaranteed spots for the next season.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card className='p-6 border-warning/50 bg-warning/10 relative overflow-hidden'>
          <div className='absolute top-0 right-0 p-4 opacity-10'>
            <Trophy className="h-24 w-24 text-warning" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-surface-highlight text-text-muted p-2 rounded-lg border border-border">
                <span className="font-bold text-lg">{rules.rewards.firstPlace.name}</span>
              </div>
              <h3 className="text-xl font-bold text-text-main">{`${rules.rewards.firstPlace.name} Place`}</h3>
            </div>
            <ul className="space-y-3">
              {rules.rewards.firstPlace.items.map((it, i) => (
                <li key={i} className="flex items-start gap-2 text-text-main font-medium">
                  <CheckCircle className="h-5 w-5 text-warning shrink-0" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className='p-6 border-border relative overflow-hidden'>
          <div className='absolute top-0 right-0 p-4 opacity-5'>
            <Trophy className="h-24 w-24 text-warning" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-surface-highlight text-text-muted p-2 rounded-lg border border-border">
                <span className="font-bold text-lg">{rules.rewards.secondPlace.name}</span>
              </div>
              <h3 className="text-xl font-bold text-text-main">{`${rules.rewards.secondPlace.name} Place`}</h3>
            </div>
            <ul className="space-y-3">
              {rules.rewards.secondPlace.items.map((it, i) => (
                <li key={i} className="flex items-start gap-2 text-text-muted">
                  <CheckCircle className="h-5 w-5 text-text-muted shrink-0" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className='p-6 border-border relative overflow-hidden'>
          <div className='absolute top-0 right-0 p-4 opacity-5'>
            <Trophy className="h-24 w-24 text-warning" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-surface-highlight text-text-muted p-2 rounded-lg border border-border">
                <span className="font-bold text-lg">{rules.rewards.thirdPlace.name}</span>
              </div>
              <h3 className="text-xl font-bold text-text-main">{`${rules.rewards.thirdPlace.name} Place`}</h3>
            </div>
            <ul className="space-y-3">
              {rules.rewards.thirdPlace.items.map((it, i) => (
                <li key={i} className="flex items-start gap-2 text-text-muted">
                  <CheckCircle className="h-5 w-5 text-text-muted shrink-0" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-sm text-text-muted italic">{rules.rewards.notes}</p>
      </div>
    </div>
  );
};

export default PrizesRewards;
