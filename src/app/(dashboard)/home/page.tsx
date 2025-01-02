import { Button } from "@/components/ui/button";
import React from "react";

const homePage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="max-w-4xl w-full px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-6">
          Welcome to AI SaaS Boilerplate
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          Your all-in-one solution for building powerful AI-driven applications.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
              <p className="text-muted-foreground mb-6">
                Follow our quick start guide to set up your project and start
                building in minutes.
              </p>
            </div>
            <Button className="w-full">Read Documentation</Button>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Features</h2>
              <ul className="list-disc list-inside text-muted-foreground mb-6">
                <li>Responsive layout</li>
                <li>Dark mode support</li>
                <li>AI integration ready</li>
                <li>Customizable components</li>
              </ul>
            </div>
            <Button variant="outline" className="w-full">
              Explore Features
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default homePage;
