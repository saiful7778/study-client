/* eslint-disable react/no-unescaped-entities */
import { accordionData } from "../assets/data/staticData";
import Accordion, {
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
} from "../components/Accordion";

const Faq = () => {
  const renderAccoridionv2 = accordionData.children?.map((ele) => (
    <AccordionItem key={ele._id} id={accordionData.accordionName}>
      <AccordionItemHeader>{ele.header}</AccordionItemHeader>
      <AccordionItemContent>{ele.content}</AccordionItemContent>
    </AccordionItem>
  ));

  return (
    <div>
      <div className="text-center mt-20 mb-10">
        <h3 className="text-5xl font-bold">FAQ</h3>
        <p className="text-gray-600">People asked</p>
      </div>
      <div className=" md:w-4/5 xl:w-1/2 w-full mx-auto p-2">
        <Accordion>{renderAccoridionv2}</Accordion>
      </div>
    </div>
  );
};

export default Faq;
