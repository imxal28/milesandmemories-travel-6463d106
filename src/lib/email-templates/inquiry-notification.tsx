import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

export interface InquiryNotificationProps {
  name?: string;
  email?: string;
  phone?: string;
  destination?: string;
  travelDates?: string;
  travelType?: string;
  travelTypeOther?: string | null;
  persons?: number | string;
  childrenAges?: string | null;
  budget?: string;
  notes?: string | null;
  submittedAt?: string;
}

const row = (label: string, value?: string | number | null) => {
  if (value === null || value === undefined || value === "") return null;
  return (
    <Text style={{ margin: "6px 0", fontSize: 14, lineHeight: 1.5 }}>
      <strong style={{ color: "#3a2f26" }}>{label}: </strong>
      <span style={{ color: "#3a2f26" }}>{String(value)}</span>
    </Text>
  );
};

export function InquiryNotification(props: InquiryNotificationProps) {
  const {
    name,
    email,
    phone,
    destination,
    travelDates,
    travelType,
    travelTypeOther,
    persons,
    childrenAges,
    budget,
    notes,
    submittedAt,
  } = props;

  return (
    <Html>
      <Head />
      <Preview>New enquiry from {name || "a traveller"}</Preview>
      <Body
        style={{
          backgroundColor: "#faf6ee",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          margin: 0,
          padding: "24px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            maxWidth: 560,
            margin: "0 auto",
            padding: "32px",
            borderRadius: 4,
            border: "1px solid #ece4d3",
          }}
        >
          <Heading
            as="h1"
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: "#3a2f26",
              margin: "0 0 4px",
              letterSpacing: 0.3,
            }}
          >
            New Enquiry
          </Heading>
          <Text style={{ margin: 0, color: "#8a7a68", fontSize: 13 }}>
            Miles &amp; Memories
          </Text>
          <Hr style={{ borderColor: "#ece4d3", margin: "20px 0" }} />

          <Section>
            <Heading
              as="h2"
              style={{ fontSize: 14, color: "#a0522d", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}
            >
              Contact
            </Heading>
            {row("Name", name)}
            {row("Email", email)}
            {row("Phone", phone)}
          </Section>

          <Hr style={{ borderColor: "#ece4d3", margin: "20px 0" }} />

          <Section>
            <Heading
              as="h2"
              style={{ fontSize: 14, color: "#a0522d", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}
            >
              Trip Details
            </Heading>
            {row("Destination", destination)}
            {row("Travel dates", travelDates)}
            {row("Travel type", travelType)}
            {row("Other travel type", travelTypeOther ?? undefined)}
            {row("Travellers", persons)}
            {row("Children ages", childrenAges ?? undefined)}
            {row("Budget", budget)}
          </Section>

          {notes ? (
            <>
              <Hr style={{ borderColor: "#ece4d3", margin: "20px 0" }} />
              <Section>
                <Heading
                  as="h2"
                  style={{ fontSize: 14, color: "#a0522d", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}
                >
                  Notes
                </Heading>
                <Text style={{ margin: 0, color: "#3a2f26", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {notes}
                </Text>
              </Section>
            </>
          ) : null}

          {submittedAt ? (
            <>
              <Hr style={{ borderColor: "#ece4d3", margin: "20px 0" }} />
              <Text style={{ margin: 0, color: "#8a7a68", fontSize: 12 }}>
                Submitted {submittedAt}
              </Text>
            </>
          ) : null}
        </Container>
      </Body>
    </Html>
  );
}

export const template = {
  component: InquiryNotification,
  displayName: "Inquiry Notification",
  to: "milesandmemories@hotmail.com",
  subject: (data: Record<string, any>) =>
    `New enquiry — ${data?.destination || "Miles & Memories"}${data?.name ? ` (${data.name})` : ""}`,
  previewData: {
    name: "Sample Traveller",
    email: "traveller@example.com",
    phone: "+65 9123 4567",
    destination: "Bhutan",
    travelDates: "2026-04-10 to 2026-04-20",
    travelType: "Family",
    persons: 4,
    childrenAges: "8, 12",
    budget: "SGD 20,000",
    notes: "Interested in cultural experiences and slow travel.",
    submittedAt: new Date().toISOString(),
  },
} satisfies TemplateEntry;
