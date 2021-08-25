import { shallowMount, VueWrapper } from "@vue/test-utils";
import UrlItem from "@/components/UrlItem.vue";

describe("UrlItem.vue", () => {
  let wrapper: VueWrapper<any>;

  const props = {
    id: "123",
    fullUrl: "https://www.google.co.uk",
    shortUrl: "https://pbid.io/abcd1234",
  };

  beforeEach(() => {
    wrapper = shallowMount(UrlItem, { props });
  });

  it("renders the component correctly with the given props", () => {
    expect(wrapper.find("[data-jest-full-url]").text()).toEqual(
      "https://www.google.co.uk"
    );
    expect(wrapper.find("[data-jest-short-url]").text()).toEqual(
      "https://pbid.io/abcd1234"
    );
  });

  it("calls the correct method on each button click", async () => {
    wrapper.vm.copyUrl = jest.fn();
    wrapper.vm.removeUrl = jest.fn();
    await wrapper.find("[data-jest-copy]").trigger("click");
    expect(wrapper.vm.copyUrl).toHaveBeenCalled();
    await wrapper.find("[data-jest-delete]").trigger("click");
    expect(wrapper.vm.removeUrl).toHaveBeenCalled();
  });

  it("matches the snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
