import React, { useState } from 'react';
import { Calendar, MapPin, ExternalLink, Clock, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { seasonData } from '../data/leagueData';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import { cn } from '../lib/utils';

const Schedule: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<'current' | 'future'>('current');

  const pastQualifiers = [
    {
      id: 'q1',
      name: 'Open Qualifier #1',
      date: 'Sunday, Jan 28th',
      time: '7:00 PM - 10:00 PM',
      location: 'Paddle Up Pickleball Club',
      status: 'completed',
      link: '#'
    },
    {
      id: 'q2',
      name: 'Open Qualifier #2',
      date: 'Sunday, Feb 4th',
      time: '7:00 PM - 10:00 PM',
      location: 'Paddle Up Pickleball Club',
      status: 'completed',
      link: '#'
    }
  ];

  const futureQualifiers = [
    {
      id: 'fq1',
      name: 'Season 3 Qualifier #1',
      date: 'Sunday, Apr 7th',
      time: '7:00 PM - 10:00 PM',
      location: 'Paddle Up Pickleball Club',
      status: 'upcoming',
      link: 'https://courtreserve.com'
    },
    {
      id: 'fq2',
      name: 'Season 3 Qualifier #2',
      date: 'Sunday, Apr 14th',
      time: '7:00 PM - 10:00 PM',
      location: 'Paddle Up Pickleball Club',
      status: 'upcoming',
      link: 'https://courtreserve.com'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <PageHeader 
        title="Season Schedule" 
        subtitle="Track upcoming matches and qualifier events."
        center
      />

      {/* Season Navigation */}
      <div className="flex justify-center">
        <div className="bg-surface-highlight p-1 rounded-xl inline-flex border border-border">
          <button
            onClick={() => setSelectedSeason('current')}
            className={cn(
              "px-6 py-2.5 rounded-lg text-sm font-bold transition-all",
              selectedSeason === 'current'
                ? "bg-primary text-text-main shadow-md"
                : "text-text-muted hover:text-text-main hover:bg-surface"
            )}
          >
            Season 2 (Current)
          </button>
          <button
            onClick={() => setSelectedSeason('future')}
            className={cn(
              "px-6 py-2.5 rounded-lg text-sm font-bold transition-all",
              selectedSeason === 'future'
                ? "bg-primary text-text-main shadow-md"
                : "text-text-muted hover:text-text-main hover:bg-surface"
            )}
          >
            Season 3 (Future)
          </button>
        </div>
      </div>

      {selectedSeason === 'current' ? (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Past Qualifiers Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-surface-highlight p-2 rounded-lg border border-border">
                <CheckCircle className="h-6 w-6 text-text-muted" />
              </div>
              <h2 className="text-2xl font-bold text-text-main">Completed Qualifiers</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {pastQualifiers.map((qualifier) => (
                <Card key={qualifier.id} className="relative overflow-hidden border-border opacity-75">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-text-main mb-1">{qualifier.name}</h3>
                      <div className="flex items-center gap-2 text-text-muted text-sm">
                        <Clock className="h-4 w-4" />
                        {qualifier.time}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-highlight text-text-muted text-xs font-medium border border-border">
                      <CheckCircle className="h-3 w-3" /> Completed
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted">
                    <MapPin className="h-4 w-4" />
                    {qualifier.location}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Season Matches Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-text-main">Regular Season Matches</h2>
            </div>

            <div className="grid gap-4">
              {seasonData.weeks?.map((week) => (
                <Card key={week.id} className={`flex flex-col md:flex-row items-center justify-between p-6 ${week.isCompleted ? 'opacity-75 hover:opacity-100 transition-opacity' : 'border-primary/30 bg-primary/5'}`}>
                  <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto">
                    <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl border ${week.isCompleted ? 'bg-surface-highlight border-border' : 'bg-surface border-primary/30'} shrink-0`}>
                      <span className="text-xs text-text-muted uppercase font-bold">Week</span>
                      <span className={`text-2xl font-bold ${week.isCompleted ? 'text-text-muted' : 'text-primary'}`}>{week.id}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-main mb-1">League Night #{week.id}</h3>
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {week.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 7:00 PM</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                    {week.isCompleted ? (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-highlight text-success text-sm font-medium border border-border">
                        <CheckCircle className="h-4 w-4" /> Completed
                      </span>
                    ) : (
                      <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                        <span className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-surface text-text-muted text-sm font-medium border border-border">
                          <MapPin className="h-4 w-4" /> Paddle Up
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-text-main mb-4">Season 3 Registration</h2>
            <p className="text-text-muted">
              Registration for Season 3 qualifiers is now open. Secure your spot to compete for a place in the league.
            </p>
          </div>

          {/* Future Qualifiers Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-warning/10 p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-warning" />
              </div>
              <h2 className="text-2xl font-bold text-text-main">Upcoming Qualifiers</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {futureQualifiers.map((qualifier) => (
                <Card key={qualifier.id} className="relative overflow-hidden border-warning/20">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Calendar className="h-24 w-24" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-text-main mb-1">{qualifier.name}</h3>
                        <div className="flex items-center gap-2 text-text-muted text-sm">
                          <Clock className="h-4 w-4" />
                          {qualifier.time}
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                        <AlertCircle className="h-3 w-3" /> Open
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-text-muted mb-6">
                      <MapPin className="h-4 w-4" />
                      {qualifier.location}
                    </div>

                    <a 
                      href={qualifier.link}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-3 bg-primary text-text-main rounded-lg font-bold text-sm hover:bg-primary-hover transition-colors gap-2 shadow-lg shadow-primary/20"
                    >
                      Register on CourtReserve <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-surface-highlight rounded-2xl p-8 text-center border border-border">
            <h3 className="text-xl font-bold text-text-main mb-2">Regular Season Schedule</h3>
            <p className="text-text-muted">
              The full schedule for Season 3 will be released after qualifiers are completed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
