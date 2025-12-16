import React, { useState } from 'react';
import { rules } from '../data/rules';
import { Trophy, Users, ArrowDown, ArrowUp, CheckCircle, AlertCircle, MapPin, Clock, DollarSign, ExternalLink, User, Send, MessageSquare } from 'lucide-react';
import WeeklyPoints from '../components/WeeklyPoints';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';

const ContactForm = () => {
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/xanrzonk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          subject: "League Question (Format Page)"
        })
      });

      if (response.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-success/20 p-6 rounded-xl border border-success/50 text-center">
        <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
        <h3 className="text-lg font-bold text-success mb-2">Message Sent!</h3>
        <p className="text-success">We'll get back to you shortly.</p>
        <button onClick={() => setStatus(null)} className="mt-4 text-sm text-success hover:underline">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-1">Your Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-lg bg-surface-highlight border-border text-text-main shadow-sm focus:border-primary focus:ring-primary placeholder:text-text-muted p-3"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-1">Question</label>
        <textarea
          name="message"
          required
          rows={4}
          className="w-full rounded-lg bg-surface-highlight border-border text-text-main shadow-sm focus:border-primary focus:ring-primary placeholder:text-text-muted p-3"
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-text-main py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : <><Send className="h-4 w-4" /> Send Message</>}
      </button>
      {status === 'error' && (
        <p className="text-error text-sm text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
};

const Format = () => {
  return (
    <div className="space-y-16 pb-12">
      <PageHeader 
        title="Paddle Up Individual Championship League" 
        subtitle="The premier competitive league in St. Louis. Merit-based advancement, weekly stakes, and a path to the championship."
        center
      />
        
      {/* Quick Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <Clock className="h-6 w-6 text-primary mb-2" />
          <span className="font-bold text-text-main">Sundays</span>
          <span className="text-sm text-text-muted">7:00 - 9:00 PM</span>
        </Card>
        <a 
          href="https://maps.app.goo.gl/dKNY9dnEDiFdM3XK8" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block group"
        >
          <Card className="p-4 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors h-full">
            <MapPin className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-text-main">Paddle Up</span>
            <span className="text-sm text-text-muted flex items-center gap-1">
              Chesterfield <ExternalLink className="h-3 w-3" />
            </span>
          </Card>
        </a>
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <DollarSign className="h-6 w-6 text-primary mb-2" />
          <span className="font-bold text-text-main">$160</span>
          <span className="text-sm text-text-muted">6 Week Season</span>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <User className="h-6 w-6 text-primary mb-2" />
          <span className="font-bold text-text-main">Individual</span>
          <span className="text-sm text-text-muted">No Partner Needed</span>
        </Card>
      </div>

      {/* Prizes & Rewards */}
      <div className="bg-gradient-to-br from-surface to-surface-highlight rounded-2xl p-8 md:p-12 text-text-main relative overflow-hidden border border-border">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Trophy className="h-64 w-64" />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Trophy className="h-8 w-8 text-warning" />
            What You're Playing For
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-warning mb-2">Cash Prize</h3>
              <p className="text-text-muted">
                Compete for a cash pool awarded to the season champion.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-warning mb-2">Championship Points</h3>
              <p className="text-text-muted">
                Earn official Paddle Up Championship Points towards year-end rankings.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-warning mb-2">Guaranteed Spot</h3>
              <p className="text-text-muted">
                Top performers secure a guaranteed roster spot for the next season.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seeding & Assignments */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-main mb-4">Seeding & Assignments</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Your season performance determines your starting position each week.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-text-main mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Initial Seeding
            </h3>
            <p className="text-text-muted mb-4">
              Players are ranked 1-16 based on their current season points. In Week 1, DUPR ratings are used.
            </p>
            <div className="bg-surface-highlight p-4 rounded-lg border border-border">
              <h4 className="font-bold text-sm text-text-main mb-2">Why Seeding Matters</h4>
              <p className="text-sm text-text-muted">
                Higher seeds are placed in groups with lower-seeded opponents in Round 1. This gives top players a statistical advantage to finish Top 2 and advance to the Upper Bracket immediately.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-text-main mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              The Snake Draw
            </h3>
            <p className="text-text-muted mb-4">
              We use a balanced "Snake Draw" to assign the initial 4 courts. This ensures fair competition across the league.
            </p>
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
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-main mb-4">The Nightly Format</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Three rounds of intense play. Perform well to move up; struggle and you move down.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -z-10 transform -translate-x-1/2"></div>

          <div className="space-y-12">
            {/* Round 1 */}
            <div className="relative">
              <Card className="p-8 max-w-3xl mx-auto">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-text-main px-4 py-1 rounded-full text-sm font-bold">
                  ROUND 1
                </div>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-primary-light p-4 rounded-full">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-text-main mb-2">{rules.format[0].title}</h3>
                    <div className="text-text-muted text-left">
                      {Array.isArray(rules.format[0].description) ? (
                        <ul className="list-disc pl-5 space-y-1 inline-block text-left">
                          {rules.format[0].description.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{rules.format[0].description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Transition 1 */}
            <div className="flex justify-center">
              <div className="bg-surface p-2 rounded-full border border-border shadow-sm">
                <ArrowDown className="h-6 w-6 text-text-muted" />
              </div>
            </div>

            {/* Round 2 */}
            <div className="relative">
              <Card className="p-8 max-w-3xl mx-auto">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-text-main px-4 py-1 rounded-full text-sm font-bold">
                  ROUND 2
                </div>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-primary-light p-4 rounded-full">
                    <ArrowUp className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-text-main mb-2">{rules.format[1].title}</h3>
                    <div className="text-text-muted text-left">
                      {Array.isArray(rules.format[1].description) ? (
                        <ul className="list-disc pl-5 space-y-1 inline-block text-left">
                          {rules.format[1].description.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{rules.format[1].description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Transition 2 */}
            <div className="flex justify-center">
              <div className="bg-surface p-2 rounded-full border border-border shadow-sm">
                <ArrowDown className="h-6 w-6 text-text-muted" />
              </div>
            </div>

            {/* Round 3 */}
            <div className="relative">
              <Card className="p-8 max-w-3xl mx-auto border-warning/50 bg-warning/10">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-warning text-surface px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                  ROUND 3
                </div>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-warning/20 p-4 rounded-full">
                    <Trophy className="h-8 w-8 text-warning" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-text-main mb-2">{rules.format[2].title}</h3>
                    <div className="text-text-muted text-left mb-4">
                      {Array.isArray(rules.format[2].description) ? (
                        <ul className="list-disc pl-5 space-y-1 inline-block text-left">
                          {rules.format[2].description.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{rules.format[2].description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Points */}
      <div className="max-w-4xl mx-auto">
        <WeeklyPoints />
        <p className="text-center text-sm text-text-muted mt-4 italic">Missed week = 0 points</p>
      </div>

      {/* How to Join */}
      <div className="bg-primary-light rounded-2xl p-8 md:p-12 text-center border border-primary/50">
        <h2 className="text-3xl font-bold text-text-main mb-4">Ready to Compete?</h2>
        <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
          Registration is open for the upcoming season. Secure your spot now.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a 
            href="#" 
            className="bg-primary text-text-main px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            Register on CourtReserve <ExternalLink className="h-5 w-5" />
          </a>
        </div>
        <p className="text-sm text-text-muted mt-6">
          *Future seasons may require participation in qualifying nights to earn a roster spot.
        </p>
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
          <h2 className="text-3xl font-bold text-text-main">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card>
              <h3 className="font-bold text-text-main mb-2">What happens if I miss a week?</h3>
              <p className="text-text-muted">
                If you miss a week, you receive 0 points for that night. You must notify the league admin so a substitute can be assigned. You are allowed a maximum of 2 sub replacements per season.
              </p>
            </Card>
            <Card>
              <h3 className="font-bold text-text-main mb-2">Can I choose my own sub?</h3>
              <p className="text-text-muted">
                No. To ensure competitive balance and fairness, all substitutes are assigned by the league administration from the approved sub pool.
              </p>
            </Card>
            <Card>
              <h3 className="font-bold text-text-main mb-2">How do I qualify for the next season?</h3>
              <p className="text-text-muted">
                The top 4 players from the current season automatically qualify for the next season. Other spots may be filled through open registration or qualifying nights.
              </p>
            </Card>
            <Card>
              <h3 className="font-bold text-text-main mb-2">Is there a warm-up period?</h3>
              <p className="text-text-muted">
                Yes, courts are available for warm-up starting at 6:45 PM. League play begins promptly at 7:00 PM.
              </p>
            </Card>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-1">
          <Card className="sticky top-8">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-text-main">Have Questions?</h2>
            </div>
            <p className="text-text-muted text-sm mb-6">
              Can't find what you're looking for? Send us a message and we'll help you out.
            </p>
            <ContactForm />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Format;
