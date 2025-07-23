"use client";

import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";

export function Onboarding() {
	const [step, setStep] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
		if (!hasSeenOnboarding) {
			setIsOpen(true);
		}
	}, []);

	const handleNext = () => {
		setStep(step + 1);
	};

	const handleClose = () => {
		setIsOpen(false);
		localStorage.setItem("hasSeenOnboarding", "true");
	};

	const renderStepContent = () => {
		switch (step) {
			case 0:
				return (
					<div className="space-y-5">
						<div className="space-y-3">
							<Title title="Welcome to OpenCut Beta! 🎉" />
							<Description description="You're among the first to try OpenCut - the fully open source CapCut alternative." />
						</div>
						<NextButton onClick={handleNext}>Next</NextButton>
					</div>
				);
			case 1:
				return (
					<div className="space-y-5">
						<div className="space-y-3">
							<Title title="⚠️ This is a super early beta!" />
							<Description description="OpenCut started just one month ago. There's still a ton of things to do to make this editor amazing." />
							<Description description="If you're curious, check out our roadmap [here](https://opencut.app/roadmap)" />
						</div>
						<NextButton onClick={handleNext}>Next</NextButton>
					</div>
				);
			case 2:
				return (
					<div className="space-y-5">
						<div className="space-y-3">
							<Title title="🦋 Have fun testing!" />
							<Description description="Join our [Discord](https://discord.gg/zmR9N35cjK), chat with cool people and share feedback to help make OpenCut the best editor ever." />
						</div>
						<NextButton onClick={handleClose}>Finish</NextButton>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<Dialog onOpenChange={handleClose} open={isOpen}>
			<DialogContent className="!outline-none sm:max-w-[425px]">
				{renderStepContent()}
			</DialogContent>
		</Dialog>
	);
}

function Title({ title }: { title: string }) {
	return <h2 className="font-bold text-lg md:text-xl">{title}</h2>;
}

function Subtitle({ subtitle }: { subtitle: string }) {
	return <h3 className="font-medium text-lg">{subtitle}</h3>;
}

function Description({ description }: { description: string }) {
	return (
		<div className="text-muted-foreground">
			<ReactMarkdown
				components={{
					p: ({ children }) => <p className="mb-0">{children}</p>,
					a: ({ href, children }) => (
						<a
							className="text-foreground underline hover:text-foreground/80"
							href={href}
							rel="noopener noreferrer"
							target="_blank"
						>
							{children}
						</a>
					),
				}}
			>
				{description}
			</ReactMarkdown>
		</div>
	);
}

function NextButton({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick: () => void;
}) {
	return (
		<Button className="w-full" onClick={onClick} variant="default">
			{children}
			<ArrowRightIcon className="h-4 w-4" />
		</Button>
	);
}
