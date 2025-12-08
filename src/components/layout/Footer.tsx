import { Link } from "react-router-dom";
import { GraduationCap, Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display font-bold text-xl">ProctorEd</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Secure, scalable online examination platform with AI-powered proctoring for academic integrity.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/docs" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  User Guides
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} ProctorEd. All rights reserved.
          </p>
          <p className="text-sm text-primary-foreground/50">
            Made with care for academic integrity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
