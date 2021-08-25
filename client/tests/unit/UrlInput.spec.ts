import { shallowMount, VueWrapper } from "@vue/test-utils";
import UrlInput from "@/components/UrlInput.vue";

describe("UrlInput.vue", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(UrlInput);
  });

  it("adds the error class when there is an invalid url", async () => {
    expect(wrapper.find("[data-jest-input]").classes()).not.toContain("error");
    await wrapper.setData({ invalidUrl: true });
    expect(wrapper.find("[data-jest-input]").classes()).toContain("error");
  });

  it("shows the error message when there is an invalid url", async () => {
    expect(wrapper.find("[data-jest-message]").exists()).toBe(false);
    await wrapper.setData({ invalidUrl: true });
    expect(wrapper.find("[data-jest-message]").exists()).toBe(true);
  });

  it("disables the button when the input is empty", async () => {
    expect(wrapper.find("[data-jest-button]").attributes()).toHaveProperty(
      "disabled"
    );
    await wrapper.setData({ url: "https://www.google.co.uk" });
    expect(wrapper.find("[data-jest-button]").attributes()).not.toHaveProperty(
      "disabled"
    );
  });

  it("should only submit the form with a url present", async () => {
    wrapper.vm.shortenUrl = jest.fn();
    await wrapper.find("[data-jest-button]").trigger("submit");
    expect(wrapper.vm.shortenUrl).not.toHaveBeenCalled();
    await wrapper.setData({ url: "https://www.google.co.uk" });
    await wrapper.find("[data-jest-button]").trigger("submit");
    expect(wrapper.vm.shortenUrl).toHaveBeenCalled();
  });

  it("matches the snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
