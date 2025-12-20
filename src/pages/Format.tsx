import React, { useState, useEffect } from 'react';
import { rules } from '../data/rules';
import {
  Trophy,
  Users,
  ArrowDown,
  ArrowUp,
  CheckCircle,
  AlertCircle,
  MapPin,
  Clock,
  DollarSign,
  ExternalLink,
  User,
  Send,
  MessageSquare
} from 'lucide-react';
import WeeklyPoints from '../components/WeeklyPoints';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';
import ToggleGroup from '../components/ui/ToggleGroup';
import QuickInfoGrid from '../components/format/QuickInfoGrid';
import ScoringSection from '../components/format/ScoringSection';
import SeasonStructure from '../components/format/SeasonStructure';
import PrizesRewards from '../components/format/PrizesRewards';
import PreSeasonQualifiers from '../components/format/PreSeasonQualifiers';
import NightlyFormat from '../components/format/NightlyFormat';
import FAQSection from '../components/format/FAQSection';
import ContactCard from '../components/format/ContactCard';
import getFormatConfig from '../lib/formatUtils';

const Format: React.FC = () => {
  const [view, setView] = useState<'current' | 'future'>('current');
  const merged = getFormatConfig(view);

  useEffect(() => {
    document.title = `${rules.title} — ${merged.title}`;
  }, [merged.title]);

  return (
    <div className="space-y-16 pb-12">
      <PageHeader
        title={`${rules.title} — ${merged.title}`}
        subtitle="Rotating partners, weekly standings with promotion/relegation, weekly points, open qualifiers, and season prizes."
        center
      />

      <div className="flex justify-center mt-6">
        <ToggleGroup
          options={[
            { value: 'current', label: 'The Challenge (Current)' },
            { value: 'future', label: 'Championship League (Future)' }
          ]}
          value={view}
          onChange={(v) => setView(v as 'current' | 'future')}
          className="bg-surface-highlight p-1 rounded-xl inline-flex border border-border"
        />
      </div>

      {/* Quick Info Grid */}
      <QuickInfoGrid price={merged.price} />

      {/* Scoring */}
      <ScoringSection />

      {/* Season Structure */}
      {merged.showSections.seasonStructure && <SeasonStructure />}

      {/* Prizes & Rewards */}
      {merged.showSections.prizes && <PrizesRewards />}

      {/* Pre-Season Qualifiers */}
      {merged.showSections.qualifiers && <PreSeasonQualifiers />}

      {/* Seeding & Assignments */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-main mb-4">Seeding & Assignments</h2>
          <p className="text-text-muted max-w-2xl mx-auto">{rules.seeding?.overview}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-text-main mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Initial Seeding
            </h3>
            <p className="text-text-muted mb-4">{rules.seeding?.week1}</p>
            <div className="bg-surface-highlight p-4 rounded-lg border border-border">
              <h4 className="font-bold text-sm text-text-main mb-2">Why Seeding Matters</h4>
              <p className="text-sm text-text-muted">
                Higher seeds are placed in groups with lower-seeded opponents in Round 1, giving top players a statistical advantage to finish Top 2 and advance.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-text-main mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              The Snake Draw
            </h3>
            <p className="text-text-muted mb-4">{rules.seeding?.draw}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-surface-highlight p-2 rounded border border-border">
                <span className="font-bold block text-primary">Court 1</span>
                <span className="text-text-muted">Seeds 1, 8, 9, 16</span>
              </div>
              <div className="bg-surface-highlight p-2 rounded border border-border">
                <span className="font-bold block text-primary">Court 2</span>
                <span className="text-text-muted">Seeds 2, 7, 10, 15</span>
              </div>
              <div className="bg-surface-highlight p-2 rounded border border-border">
                <span className="font-bold block text-primary">Court 3</span>
                <span className="text-text-muted">Seeds 3, 6, 11, 14</span>
              </div>
              <div className="bg-surface-highlight p-2 rounded border border-border">
                <span className="font-bold block text-primary">Court 4</span>
                <span className="text-text-muted">Seeds 4, 5, 12, 13</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Nightly Format */}
      <NightlyFormat />

      {/* Weekly Points */}
      <div className="max-w-4xl mx-auto">
        <WeeklyPoints />
        <p className="text-center text-sm text-text-muted mt-4 italic">{rules.missedWeekNote}</p>
      </div>

      {/* How to Join */}
      <div className="bg-primary-light rounded-2xl p-8 md:p-12 text-center border border-primary/50">
        <h2 className="text-3xl font-bold text-text-main mb-4">Ready to Compete?</h2>
        <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">Registration is open for the upcoming season. Secure your spot now.</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a
            href={rules.register.url}
            className="bg-primary text-text-main px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            {rules.register.text}
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
        <p className="text-sm text-text-muted mt-6">*Future seasons may require participation in qualifying nights to earn a roster spot.</p>
      </div>

      {/* Rules & Policies Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Eligibility */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-6 w-6 text-success" />
            <h2 className="text-xl font-bold text-text-main">Eligibility</h2>
          </div>
          <ul className="space-y-3">
            {rules.general.map((rule, index) => (
              <li key={index} className="flex items-start text-text-muted">
                <span className="mr-2">•</span>
                {rule}
              </li>
            ))}
          </ul>
        </Card>

        {/* Substitutes */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-6 w-6 text-warning" />
            <h2 className="text-xl font-bold text-text-main">Substitute Policy</h2>
          </div>
          <ul className="space-y-3">
            {rules.subs.map((rule, index) => (
              <li key={index} className="flex items-start text-text-muted">
                <span className="mr-2">•</span>
                {rule}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* FAQ & Contact Section */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="md:col-span-2 space-y-8">
          <FAQSection />
        </div>

        <div className="md:col-span-1">
          <ContactCard />
        </div>
      </div>
    </div>
  );
};

export default Format;
