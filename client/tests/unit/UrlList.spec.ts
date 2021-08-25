import { shallowMount, VueWrapper } from "@vue/test-utils";
import UrlList from "@/components/UrlList.vue";

describe("UrlList.vue", () => {
  let wrapper: VueWrapper<any>;

  const props = {
    urls: [
      {
        id: "1",
        fullUrl: "https://www.google.co.uk/",
        shortUrl: "https://pbid.io/abcd1234",
      },
      {
        id: "1",
        fullUrl: "https://primarybid.com/home/",
        shortUrl: "https://pbid.io/abcd9876",
      },
    ],
  };

  beforeEach(() => {
    wrapper = shallowMount(UrlList, { props });
  });

  it("renders the correct number of items", () => {
    expect(wrapper.findAll("[data-jest-item]")).toHaveLength(2);
  });

  it("matches the snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
