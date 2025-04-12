
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Asterisk, Github, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [step, setStep] = useState<'credentials' | 'usage' | 'organization'>('credentials');

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!acceptTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please accept the terms of service to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Account created",
        description: "We've created your account for you.",
      });
      
      // Redirect to onboarding
      navigate('/onboarding');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignUp = (provider: 'github' | 'google') => {
    setIsLoading(true);
    
    // Mock OAuth flow
    setTimeout(() => {
      toast({
        title: `${provider.charAt(0).toUpperCase() + provider.slice(1)} sign up`,
        description: "Redirecting to authentication provider...",
      });
      
      // In a real app, this would redirect to the OAuth provider
      setTimeout(() => {
        navigate('/onboarding');
      }, 1000);
    }, 500);
  };

  // Usage options for the second step
  const usagePurposes = [
    { id: 'personal', label: 'Personal project' },
    { id: 'work', label: 'Work project' },
    { id: 'startup', label: 'Startup' },
    { id: 'enterprise', label: 'Enterprise' },
    { id: 'education', label: 'Education' },
    { id: 'other', label: 'Other' }
  ];

  // Conditional rendering based on step
  const renderStepContent = () => {
    switch (step) {
      case 'credentials':
        return (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => handleOAuthSignUp('github')}
                disabled={isLoading}
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => handleOAuthSignUp('google')}
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 mr-2">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
            </div>
            
            <div className="relative my-6 text-center">
              <span className="bg-background px-2 text-xs text-muted-foreground">
                or
              </span>
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email address
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className={`w-full ${errors.email ? 'border-error' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <div className="mt-1 text-sm text-error flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className={`w-full pr-10 ${errors.password ? 'border-error' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </button>
                  {errors.password && (
                    <div className="mt-1 text-sm text-error flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={() => setAcceptTerms(!acceptTerms)}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
            </div>

            <Button 
              className="w-full mt-6" 
              disabled={isLoading || !acceptTerms} 
              onClick={() => {
                if (validateForm() && acceptTerms) {
                  setStep('usage');
                }
              }}
            >
              Continue
            </Button>
          </>
        );

      case 'usage':
        return (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold">How will you use Flow AI?</h2>
              <p className="text-sm text-muted-foreground">This helps us tailor your experience</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {usagePurposes.map(purpose => (
                <Button 
                  key={purpose.id}
                  variant="outline" 
                  className="justify-start px-4 py-6 h-auto"
                  onClick={() => setStep('organization')}
                >
                  {purpose.label}
                </Button>
              ))}
            </div>

            <div className="flex gap-3 mt-4">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => setStep('credentials')}
              >
                Back
              </Button>
              <Button 
                className="flex-1" 
                onClick={() => setStep('organization')}
              >
                Continue
              </Button>
            </div>
          </>
        );

      case 'organization':
        return (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold">Tell us about your organization</h2>
              <p className="text-sm text-muted-foreground">This helps us customize your workflows</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="orgName" className="block text-sm font-medium mb-1">
                  Organization name
                </label>
                <Input
                  id="orgName"
                  type="text"
                  placeholder="Your company or team name"
                />
              </div>
              
              <div>
                <label htmlFor="orgSize" className="block text-sm font-medium mb-1">
                  Organization size
                </label>
                <select 
                  id="orgSize" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select organization size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501+">501+ employees</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="industry" className="block text-sm font-medium mb-1">
                  Industry
                </label>
                <select 
                  id="industry" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => setStep('usage')}
              >
                Back
              </Button>
              <Button 
                className="flex-1" 
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/10 p-4">
      <div className="w-full max-w-md bg-background rounded-lg shadow-sm border border-border">
        <div className="p-8">
          <div className="flex flex-col items-center mb-6">
            <Asterisk className="h-10 w-10 mb-3 text-primary" />
            <h1 className="text-2xl font-medium">Create your account</h1>
            <p className="text-muted-foreground text-sm">Welcome to Flow AI! Please fill in the details to get started.</p>
          </div>
          
          {/* Progress indicator */}
          {step !== 'credentials' && (
            <div className="flex justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary text-white w-6 h-6 flex items-center justify-center text-xs">
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-xs font-medium">Account</span>
              </div>
              <div className="w-16 h-px bg-border self-center"></div>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "rounded-full w-6 h-6 flex items-center justify-center text-xs", 
                  step === 'usage' || step === 'organization' ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                )}>
                  {step === 'usage' || step === 'organization' ? <Check className="h-3 w-3" /> : "2"}
                </div>
                <span className="text-xs font-medium">Usage</span>
              </div>
              <div className="w-16 h-px bg-border self-center"></div>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "rounded-full w-6 h-6 flex items-center justify-center text-xs", 
                  step === 'organization' ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                )}>
                  {step === 'organization' ? <Check className="h-3 w-3" /> : "3"}
                </div>
                <span className="text-xs font-medium">Organization</span>
              </div>
            </div>
          )}
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            {renderStepContent()}
          </form>
        </div>
        
        <div className="p-6 bg-secondary/30 text-center rounded-b-lg">
          <p className="text-sm text-muted-foreground">
            Already have an account? <Link to="/signin" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
